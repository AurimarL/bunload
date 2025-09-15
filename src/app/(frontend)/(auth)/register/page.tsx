// app/register/page.tsx

import { redirect } from "next/navigation";
import payload from "@/payload";

export const dynamic = "force-dynamic";

export default function RegisterPage() {
  // Server action
  async function handleRegister(formData: FormData) {
    "use server";

    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    const confirmPassword = formData.get("confirmPassword")?.toString() || "";

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const { docs: roles } = await payload.find({
      collection: "roles",
      where: { name: { like: "user" } },
    });

    const defaultUserRoleId = roles[0]?.id;

    if (!defaultUserRoleId) throw new Error("Default user role not found");

    await payload.create({
      collection: "users",
      data: { email, password, roles: [defaultUserRoleId] },
    });

    // After successful registration, redirect to login page
    redirect("/login");
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Register</h1>

      <form
        action={handleRegister} // ✅ Now TypeScript is happy
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </main>
  );
}
