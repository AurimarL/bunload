"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
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
} from "./actions"
import type { Todo } from "@/payload-types"

export default function PlaygroundPageClient({
    todos,
}: { todos: Todo[] | undefined }) {
    const router = useRouter()
    const [loadingAction, setLoadingAction] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()

    async function handleAction(
        action: (formData?: FormData) => Promise<void>,
        label: string,
        formData?: FormData
    ) {
        setLoadingAction(label)
        const start = performance.now()

        await action(formData)

        const duration = ((performance.now() - start) / 1000).toFixed(2)
        toast.success(`${label} concluído em ${duration}s 🚀`, {
            description: new Date().toLocaleTimeString(),
        })

        startTransition(() => router.refresh())
        setLoadingAction(null)
    }

    return (
        <main className="max-w-2xl mx-auto py-10 space-y-10">
            <header className="space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight">
                    🧠 Todo Playground
                </h1>
                <p className="text-sm text-gray-500">
                    Compare Payload vs Drizzle performance
                </p>
            </header>

            {/* Payload Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>PayloadCMS Actions</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <Button
                        onClick={() => handleAction(generateBatch, "Payload Sequential")}
                        disabled={loadingAction === "Payload Sequential"}
                        variant="secondary"
                    >
                        {loadingAction === "Payload Sequential"
                            ? "🐢 Gerando..."
                            : "🐢 Payload Sequential"}
                    </Button>
                    <Button
                        onClick={() => handleAction(parallelGenerateBatch, "Payload Parallel")}
                        disabled={loadingAction === "Payload Parallel"}
                        variant="outline"
                    >
                        {loadingAction === "Payload Parallel"
                            ? "⚡ Gerando..."
                            : "⚡ Payload Parallel"}
                    </Button>
                    <Button
                        onClick={() =>
                            handleAction(safeParallelGenerateBatch, "Payload Safe Parallel")
                        }
                        disabled={loadingAction === "Payload Safe Parallel"}
                        variant="destructive"
                    >
                        {loadingAction === "Payload Safe Parallel"
                            ? "🧩 Gerando..."
                            : "🧩 Payload Safe Parallel"}
                    </Button>
                    <Button
                        onClick={() => handleAction(deleteAllTodos, "Payload Delete All")}
                        disabled={loadingAction === "Payload Delete All"}
                        variant="destructive"
                    >
                        {loadingAction === "Payload Delete All"
                            ? "🗑️ Apagando..."
                            : "🗑️ Payload Delete All"}
                    </Button>
                </CardContent>
            </Card>

            {/* Drizzle Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Drizzle ORM Actions</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <Button
                        onClick={() => handleAction(drizzleBatchInsert, "Drizzle Insert All")}
                        disabled={loadingAction === "Drizzle Insert All"}
                        variant="secondary"
                    >
                        {loadingAction === "Drizzle Insert All"
                            ? "⏳ Inserindo..."
                            : "🪄 Drizzle Insert All"}
                    </Button>

                    <Button
                        onClick={() =>
                            handleAction(drizzleSafeParallelInsert, "Drizzle Chunked Insert")
                        }
                        disabled={loadingAction === "Drizzle Chunked Insert"}
                        variant="outline"
                    >
                        {loadingAction === "Drizzle Chunked Insert"
                            ? "🧩 Inserindo..."
                            : "🧩 Drizzle Chunked Insert"}
                    </Button>

                    <Button
                        onClick={() => handleAction(drizzleDeleteAll, "Drizzle Delete All")}
                        disabled={loadingAction === "Drizzle Delete All"}
                        variant="destructive"
                    >
                        {loadingAction === "Drizzle Delete All"
                            ? "🗑️ Apagando..."
                            : "🗑️ Drizzle Delete All"}
                    </Button>
                </CardContent>
            </Card>

            <Separator />

            {/* Todos list */}
            {todos && (
                <section>
                    <h2 className="text-lg font-semibold mb-3">Seus Todos</h2>
                    {todos.length === 0 ? (
                        <p className="text-gray-500 text-sm">Nenhum todo criado ainda.</p>
                    ) : (
                        <ul className="space-y-2 max-h-[500px] overflow-auto border rounded-lg p-2">
                            {todos.map((todo) => (
                                <li
                                    key={todo.id}
                                    className="border rounded-lg p-3 hover:bg-gray-50 transition"
                                >
                                    <p className="font-medium">{todo.title}</p>
                                    {todo.description && (
                                        <p className="text-sm text-gray-600">
                                            {todo.description}
                                        </p>
                                    )}
                                    <p className="text-xs text-gray-400">
                                        Status: {todo.status}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            )}
        </main>
    )
}
