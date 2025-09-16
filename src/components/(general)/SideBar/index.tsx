// SideBar.tsx
import { headers as getHeaders } from "next/headers";
import { cache, Suspense } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import payload from "@/payload";
import { ClientAppSidebar } from "./client-app-sidebar";
import ClientAppSidebarSkeleton from "./client-app-sidebar.skeleton";
import Header from "./header";

// Cache navMain globally
const getNavMain = cache(async () => {
  return payload.findGlobal({ slug: "nav-main" });
});

export default async function SideBar({
  children,
}: {
  children: React.ReactNode;
}) {
  const headers = await getHeaders();

  // Always fetch user fresh (session-based)
  const { user } = await payload.auth({ headers });

  // Fetch navMain from cache
  const navMain = await getNavMain();

  return (
    <Suspense fallback={<ClientAppSidebarSkeleton />}>
      <SidebarProvider>
        <ClientAppSidebar navMain={navMain} user={user} />
        <SidebarInset>
          <Header />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </Suspense>
  );
}
