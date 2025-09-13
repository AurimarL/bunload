import config from "@payload-config";
import { getPayload } from "payload";
import { UsersGrid } from "@/components/(app)/(users)/users-grid";

export default async function UsersPage() {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  const { docs: Users } = await payload.find({
    collection: "users",
  });

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-8">Users</h1>
      <UsersGrid users={Users} />
    </main>
  );
}
