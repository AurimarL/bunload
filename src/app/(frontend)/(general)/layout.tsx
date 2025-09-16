import SideBar from "@/components/(general)/SideBar";

export default function GeneralRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SideBar>{children}</SideBar>;
}
