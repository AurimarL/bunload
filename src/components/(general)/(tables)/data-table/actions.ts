"use server";
import { revalidatePath } from "next/cache";
import payload from "@/payload";

export async function HandleDeleteUserById(id: string) {
  try {
    await payload.delete({
      collection: "users",
      id: id,
    });
    revalidatePath("/tabs");
  } catch (error) {
    return error instanceof Error ? error.message : "Erro desconhecido";
  }
}

export async function HandleDeleteInBulkById(ids: string[]) {
  try {
    await payload.delete({
      collection: "users",
      where: {
        id: {
          in: ids,
        },
      },
      overrideAccess: false,
    });
    revalidatePath("/tabs");
  } catch (error) {
    return error instanceof Error ? error.message : "Erro desconhecido";
  }
}
