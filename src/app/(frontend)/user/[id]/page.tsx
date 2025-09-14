import { notFound } from "next/navigation";
import payload from "@/payload";

export default async function UserIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const user = await payload.findByID({
    collection: "users",
    id,
    disableErrors: true,
  });

  if (!user) {
    notFound();
  }

  return (
    <main>
      <p>Email: </p> <p>{user.email}</p>
    </main>
  );
}
