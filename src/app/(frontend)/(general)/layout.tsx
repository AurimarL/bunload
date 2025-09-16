import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import "../globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "Bun + Nextjs + Payloadcms",
  description: "Boilerplate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <Header />
            {children}
          </SidebarInset>
        </SidebarProvider>
      </body>
      <Analytics />
    </html>
  );
}
