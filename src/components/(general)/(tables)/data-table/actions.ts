"use server";
import { revalidatePath } from "next/cache";
import { headers as getHeaders } from "next/headers";
import payload from "@/payload";

export async function HandleDeleteUserById(id: string) {
  try {
    const headers = await getHeaders();
    const user = (await payload.auth({ headers })).user;
    await payload.delete({
      collection: "users",
      id: id,
      user: user,
    });
    revalidatePath("/tabs");
    return { success: true, data: null };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
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
    return { success: true, data: null };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}
