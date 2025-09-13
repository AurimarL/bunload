import config from "@payload-config";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

export default async function UserIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

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
