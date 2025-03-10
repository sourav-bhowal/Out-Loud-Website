// import { FloatingDockDemo } from "@/components/shared/FolatingNavBar";
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
      <main className="flex-1 md:ml-64 md:p-4 p-2">{children}</main>
      {/* <div className="absolute w-full">
        <FloatingDockDemo />
      </div> */}
    </div>
  );
}
