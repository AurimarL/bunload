"use server";

import { cookies } from "next/headers";
import payload from "@/payload";

export default async function handleLogin(
  _prevState: { success: boolean; error: string | null },
  formData: FormData,
) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { token } = await payload.login({
      collection: "users",
      data: { email, password },
    });

    if (token) {
      const cookieStore = await cookies();
      cookieStore.set("payload-token", token);
      return { success: true, error: null };
    }
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Invalid email or password",
    };
  }

  return { success: false, error: "Unknown error" };
}
