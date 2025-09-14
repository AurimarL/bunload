import { UsersGrid } from "@/components/(app)/(users)/users-grid";
import payload from "@/payload";

export default async function UsersPage() {

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
