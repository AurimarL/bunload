import { revalidatePath } from "next/cache";
import { Suspense } from "react";
import { viewerRoleId } from "@/helper/roles-to-id-helper";
import payload from "@/payload";
import type { IformSchema } from "./create-user-form/zod";
import { CreateUserModalClient } from "./create-user-modal.client";

async function handleCreateUser(formData: IformSchema) {
  "use server";
  try {
    await payload.create({
      collection: "users",
      data: {
        email: formData.email,
        roles: [viewerRoleId],
        password: formData.password,
        team: [formData.team_id],
      },
    });
    revalidatePath("/tables");
  } catch (error) {
    console.error(error);
    throw new Error(error as any);
  }
}

export default async function CreateUserModal() {
  const { docs: teamData } = await payload.find({
    collection: "teams",
  });

  const data = { teams: teamData };
  const handler = { handleCreateUser };

  return (
    <Suspense>
      <CreateUserModalClient data={data} handler={handler} />
    </Suspense>
  );
}
