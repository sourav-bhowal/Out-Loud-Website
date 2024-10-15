import NavSideBar from "@/components/shared/NavSideBar";

// MAIN LAYOUT
export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <NavSideBar />
      <main className="flex-1 md:ml-64 p-4">{children}</main>
    </div>
  );
}
