"use server"

import { faker } from "@faker-js/faker"
import { getPayload } from "payload"
import { revalidatePath } from "next/cache"
import { todo } from "@/payload-generated-schema"
import usePayload from "@/lib/usePayload"

// -------------------- Payload-based actions --------------------

export async function createTodo(formData: FormData) {
    const payload = await usePayload()

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    if (!title) return

    await payload.create({
        collection: "todo",
        data: { title, description, status: "PENDING" },
    })

    revalidatePath("/playground")
}

export async function generateBatch() {
    const payload = await usePayload()
    const fakeTodos = Array.from({ length: 500 }).map(() => ({
        title: faker.hacker.phrase(),
        description: faker.lorem.sentence(),
        status: "PENDING",
    }))

    for (const item of fakeTodos)
        await payload.create({
            collection: "todo", data: {
                title: item.title,
                description: item.description,
                status: "PENDING"
            }
        })

    revalidatePath("/playground")
}

export async function parallelGenerateBatch() {
    const payload = await usePayload()
    const fakeTodos = Array.from({ length: 500 }).map(() => ({
        title: faker.hacker.phrase(),
        description: faker.lorem.sentence(),
        status: "PENDING",
    }))
    await Promise.all(
        fakeTodos.map(({ description, title }) =>
            payload.create({
                collection: "todo", data: {
                    title,
                    description,
                    status: "PENDING"
                }
            })
        )
    )
    revalidatePath("/playground")
}

export async function safeParallelGenerateBatch() {
    const payload = await usePayload()
    const fakeTodos = Array.from({ length: 500 }).map(() => ({
        title: faker.hacker.phrase(),
        description: faker.lorem.sentence(),
        status: "PENDING",
    }))
    const chunkSize = 50
    for (let i = 0; i < fakeTodos.length; i += chunkSize) {
        const chunk = fakeTodos.slice(i, i + chunkSize)
        await Promise.all(
            chunk.map(({ description, title }) =>
                payload.create({
                    collection: "todo", data: {
                        title,
                        description,
                        status: "PENDING"
                    }
                })
            )
        )
    }
    revalidatePath("/playground")
}

export async function deleteAllTodos() {
    const payload = await usePayload()
    const { docs } = await payload.find({ collection: "todo", limit: 9999 })
    await Promise.all(
        docs.map((t) => payload.delete({ collection: "todo", id: t.id }))
    )
    revalidatePath("/playground")
}

// -------------------- Drizzle-based actions --------------------

export async function drizzleCreateTodo(formData: FormData) {
    const payload = await usePayload()
    const db = payload.db.drizzle

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    if (!title) return

    await db.insert(todo).values({
        title,
        description,
        status: "PENDING",
    })

    revalidatePath("/playground")
}

export async function drizzleBatchInsert() {
    const payload = await usePayload()
    const db = payload.db.drizzle

    const fakeTodos = Array.from({ length: 500 }).map(() => ({
        title: faker.hacker.phrase(),
        description: faker.lorem.sentence(),
        status: "PENDING" as const,
    }))

    await db.insert(todo).values(fakeTodos)
    revalidatePath("/playground")
}

export async function drizzleSafeParallelInsert() {
    const payload = await usePayload()
    const db = payload.db.drizzle

    const fakeTodos = Array.from({ length: 500 }).map(() => ({
        title: faker.hacker.phrase(),
        description: faker.lorem.sentence(),
        status: "PENDING" as const,
    }))

    const chunkSize = 100
    for (let i = 0; i < fakeTodos.length; i += chunkSize) {
        const chunk = fakeTodos.slice(i, i + chunkSize)
        await db.insert(todo).values(chunk)
    }

    revalidatePath("/playground")
}

export async function drizzleDeleteAll() {
    const payload = await usePayload()
    const db = payload.db.drizzle
    await db.delete(todo)
    revalidatePath("/playground")
}

export async function getTodos() {
    const payload = await usePayload()
    const { docs: todos } = await payload.find({
        collection: "todo",
        sort: "-createdAt",
        limit: 20,
    })
    return todos
}