import { fileURLToPath } from "node:url";
import config from "@payload-config";
import { headers as getHeaders } from "next/headers";
import Link from "next/link";
import { getPayload } from "payload";

import { Button, buttonVariants } from "@/components/ui/button";

export default async function AuthStatusAndButton() {
  // 🔐 Auth check
  const headers = await getHeaders();
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const { user } = await payload.auth({ headers });

  // 🛠️ Debug link (opens this file in VSCode)
  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`;
  return (
    <div className="mt-8 space-y-4">
      <p className="text-gray-300">
        {user ? (
          <>
            ✅ Logged in as <strong>{user.email}</strong>
          </>
        ) : (
          "❌ You are not logged in."
        )}
      </p>

      <div className="flex gap-4 justify-center">
        <Link
          href="/admin"
          className={buttonVariants({
            className: "rounded-2xl shadow-lg",
            size: "lg",
          })}
        >
          Go to Admin
        </Link>

        <a href={fileURL} target="_blank" rel="noreferrer">
          <Button
            variant="secondary"
            size="lg"
            className="rounded-2xl shadow-lg"
          >
            Open this file in VS Code
          </Button>
        </a>
      </div>
    </div>
  );
}
