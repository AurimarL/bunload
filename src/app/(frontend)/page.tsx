// app/(frontend)/page.tsx

import AuthStatusAndButton from "@/components/(app)/AuthStatusAndButton";
import BoilerplateDescription from "@/components/(app)/BoilerplateDescription";
import TechStackCards from "@/components/(app)/TechStackCards";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">
          Bun + Next.js + Payload CMS Boilerplate
        </h1>
        <p className="text-lg text-gray-300">
          A modern full-stack starter kit designed for speed, productivity, and
          flexibility.
        </p>

        {/* --- Tech Stack Cards --- */}
        <TechStackCards />

        {/* --- Boilerplate Description --- */}
        <BoilerplateDescription />

        {/* --- Auth Status + Buttons --- */}
        <AuthStatusAndButton />
      </div>
    </main>
  );
}
