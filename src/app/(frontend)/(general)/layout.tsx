import SideBar from "@/components/sidebar";

export default function GeneralRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SideBar>{children}</SideBar>;
}
