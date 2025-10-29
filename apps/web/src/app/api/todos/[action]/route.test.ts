import { expect, test, describe, beforeAll, afterAll } from "bun:test"

const BASE_URL = "http://localhost:3002/api/todos"
const CONCURRENT_USERS = 5 // 👥 number of parallel requests per action

// 🧱 PayloadCMS actions (sem deleteAllTodos)
const payloadActions = [
  "createTodo",
  "generateBatch",
  "parallelGenerateBatch",
  "safeParallelGenerateBatch",
]

// ⚙️ Drizzle ORM actions (sem drizzleDeleteAll)
const drizzleActions = [
  "drizzleCreateTodo",
  "drizzleBatchInsert",
  "drizzleSafeParallelInsert",
]

// store timing data for report
interface TimingStats {
  min: number
  max: number
  avg: number
}
const timings: Record<string, TimingStats> = {}

async function runSingleRequest(action: string): Promise<number> {
  const start = performance.now()
  const res = await fetch(`${BASE_URL}/${action}`, { method: "POST" })
  await res.json()
  const duration = performance.now() - start
  expect(res.ok).toBeTrue()
  return duration
}

async function runAction(action: string) {
  const times: number[] = []
  const start = performance.now()

  // Run N concurrent requests
  const results = await Promise.allSettled(
    Array.from({ length: CONCURRENT_USERS }, () => runSingleRequest(action))
  )

  for (const r of results) {
    if (r.status === "fulfilled") times.push(r.value)
  }

  const duration = performance.now() - start
  const avg = times.reduce((a, b) => a + b, 0) / times.length
  const min = Math.min(...times)
  const max = Math.max(...times)

  timings[action] = { avg, min, max }

  console.log(
    `→ ${action} (${CONCURRENT_USERS} users): avg=${avg.toFixed(
      0
    )}ms | min=${min.toFixed(0)}ms | max=${max.toFixed(0)}ms | total=${duration.toFixed(0)}ms`
  )
}

async function cleanupTodos(phase: "before" | "after") {
  console.log(`\n🧹 Cleanup (${phase}) → drizzleDeleteAll ...`)
  const start = performance.now()
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 30_000) // ⏰ timeout interno de 30s

  try {
    const res = await fetch(`${BASE_URL}/drizzleDeleteAll`, {
      method: "POST",
      signal: controller.signal,
    })
    const data = await res.json()
    const duration = performance.now() - start
    console.log(`Cleanup (${phase}) completed in ${duration.toFixed(0)}ms`, data)
  } catch (err) {
    console.error(`Cleanup (${phase}) failed:`, err)
  } finally {
    clearTimeout(timeout)
  }
}

function printComparisonTable() {
  console.log(`\n📊 Performance Comparison (${CONCURRENT_USERS} concurrent users)`)
  console.log("--------------------------------------------------------------------------")
  console.log("| Stack       | Action Name                 | Avg (ms) | Min | Max |")
  console.log("--------------------------------------------------------------------------")

  const printRow = (stack: string, name: string, stats?: TimingStats) => {
    if (!stats) return
    const { avg, min, max } = stats
    console.log(
      `| ${stack.padEnd(11)} | ${name.padEnd(28)} | ${avg.toFixed(0).padStart(7)} | ${min
        .toFixed(0)
        .padStart(3)} | ${max.toFixed(0).padStart(4)} |`
    )
  }

  let totalPayload = 0
  let totalDrizzle = 0

  for (const a of payloadActions) {
    printRow("PayloadCMS", a, timings[a])
    totalPayload += timings[a]?.avg ?? 0
  }

  console.log("--------------------------------------------------------------------------")

  for (const a of drizzleActions) {
    printRow("Drizzle ORM", a, timings[a])
    totalDrizzle += timings[a]?.avg ?? 0
  }

  console.log("--------------------------------------------------------------------------")

  const avgPayload = totalPayload / payloadActions.length
  const avgDrizzle = totalDrizzle / drizzleActions.length

  const faster =
    avgPayload < avgDrizzle ? "✅ PayloadCMS faster" : "✅ Drizzle ORM faster"

  console.log(
    `| Average     | PayloadCMS: ${avgPayload.toFixed(0)}ms | Drizzle: ${avgDrizzle.toFixed(
      0
    )}ms | ${faster}`
  )

  console.log("--------------------------------------------------------------------------")
}

// 🧱 PayloadCMS Tests
describe("🧱 PayloadCMS Actions", () => {
  beforeAll(async () => {
    console.log(`Running ${CONCURRENT_USERS} users against ${BASE_URL}`)
    await cleanupTodos("before") // 🧹 Clean before running
  })

  for (const action of payloadActions) {
    test(
      `POST /api/todos/${action}`,
      async () => await runAction(action),
      { timeout: 60_000 }
    )
  }
})

// ⚙️ Drizzle Tests
describe("⚙️ Drizzle ORM Actions", () => {
  for (const action of drizzleActions) {
    test(
      `POST /api/todos/${action}`,
      async () => await runAction(action),
      { timeout: 60_000 }
    )
  }

  afterAll(async () => {
    printComparisonTable()
    await cleanupTodos("after") // 🧹 Clean after running
  })
})
