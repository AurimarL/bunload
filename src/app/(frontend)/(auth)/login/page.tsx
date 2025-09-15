// app/login/page.tsx

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import payload from "@/payload";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  // Server action for login
  async function handleLogin(formData: FormData) {
    "use server";

    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    try {
      const { token } = await payload.login({
        collection: "users",
        data: { email, password },
      });

      if (token) {
        const cookieStore = await cookies();
        cookieStore.set("payload-token", token);
      }
    } catch (err: any) {
      throw new Error(err.message || "Invalid email or password");
    }

    redirect("/");
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <form
        action={handleLogin} // server action
        className="flex flex-col gap-3 w-full max-w-sm"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="border p-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Login
        </button>
      </form>
    </main>
  );
}
