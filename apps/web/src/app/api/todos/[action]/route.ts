// apps/web/src/app/api/todos/[action]/route.ts
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import {
    createTodo,
    generateBatch,
    parallelGenerateBatch,
    safeParallelGenerateBatch,
    deleteAllTodos,
    drizzleCreateTodo,
    drizzleBatchInsert,
    drizzleSafeParallelInsert,
    drizzleDeleteAll,
} from "@/app/(app)/playground/actions"

export async function POST(
    _req: NextRequest,
    ctx: { params: Promise<{ action: string }> }
) {
    const { action } = await ctx.params

    const map: Record<string, () => Promise<any>> = {
        createTodo: async () => {
            const form = new FormData()
            form.set("title", "Test from Bun")
            form.set("description", "Created via performance test")
            await createTodo(form)
        },
        generateBatch,
        parallelGenerateBatch,
        safeParallelGenerateBatch,
        deleteAllTodos,
        drizzleCreateTodo: async () => {
            const form = new FormData()
            form.set("title", "Test Drizzle Todo")
            form.set("description", "Performance test")
            await drizzleCreateTodo(form)
        },
        drizzleBatchInsert,
        drizzleSafeParallelInsert,
        drizzleDeleteAll,
    }

    const fn = map[action]
    if (!fn) return NextResponse.json({ error: "Unknown action" }, { status: 404 })

    try {
        await fn()
        return NextResponse.json({ success: true })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: "Internal Error" }, { status: 500 })
    }
}
