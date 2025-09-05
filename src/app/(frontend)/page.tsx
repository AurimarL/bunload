import { fileURLToPath } from "node:url";
import config from "@payload-config";
import { headers as getHeaders } from "next/headers.js";
import Image from "next/image";
import { getPayload } from "payload";

export default async function HomePage() {
  const headers = await getHeaders();
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const { user } = await payload.auth({ headers });

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`;

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-between text-gray-300">
      {/* Content */}
      <div className="flex flex-col items-center gap-6 pt-20">
        <picture>
          <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg" />
          <Image
            alt="Payload Logo"
            height={200}
            width={200}
            src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
          />
        </picture>

        {!user && (
          <h1 className="text-2xl font-bold text-gray-300">
            Welcome to your new project.
          </h1>
        )}
        {user && (
          <h1 className="text-2xl font-bold text-gray-300">
            Welcome back, <span className="text-blue-600">{user.email}</span>
          </h1>
        )}

        {/* Links */}
        <div className="flex gap-6 mt-4">
          <a
            href={payloadConfig.routes.admin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Go to admin panel
          </a>
          <a
            href="https://payloadcms.com/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition"
          >
            Documentation
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full py-6 mt-12 border-t border-gray-200 flex flex-col items-center gap-2 text-sm text-gray-300">
        <p>Update this page by editing</p>
        <a className="text-blue-600 hover:underline" href={fileURL}>
          <code className="px-2 py-1 bg-gray-100 rounded">
            app/(frontend)/page.tsx
          </code>
        </a>
      </div>
    </div>
  );
}
