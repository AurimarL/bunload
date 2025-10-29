import { getPayload } from "payload"
import payloadConfig from "@/payload.config"
import PlaygroundPageClient from "./page.client"
import { getTodos } from "./actions"

export default async function PlaygroundPage() {
    // Fetch todos from Payload CMS on the server
    const todos = await getTodos()
    // Render the client component
    return <PlaygroundPageClient todos={todos} />
}
