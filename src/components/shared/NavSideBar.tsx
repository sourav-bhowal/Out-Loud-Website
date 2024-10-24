"use client";
import {
  AreaChartIcon,
  CircleHelpIcon,
  ContactRound,
  GalleryHorizontal,
  // Home,
  LayoutDashboard,
  Loader2,
  Menu,
  StarsIcon,
  X,
} from "lucide-react";
import { ThemeToggler } from "./ThemeToggler";
import { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Logo from "@/assets/logo.png";

// NAVBAR ITEMS
const navItems = [
  // { icon: Home, label: "Home", href: "/" },
  { icon: AreaChartIcon, label: "Articles", href: "/articles" },
  { icon: StarsIcon, label: "Events", href: "/events" },
  { icon: GalleryHorizontal, label: "Gallery", href: "/gallery" },
  { icon: LayoutDashboard, label: "Admin", href: "/admin" },
  { icon: ContactRound, label: "Contact Us", href: "/contact-us" },
  { icon: CircleHelpIcon, label: "About Us", href: "/about-us" },
];

// NABAR COMPONENT
export default function NavSideBar() {
  // SIDEBAR STATE
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // TOGGLE SIDEBAR FUNCTION
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // USER DATA AND LOADING STATE
  const { isLoaded } = useUser();

  // CURRENT PATH
  const pathname = usePathname();

  return (
    <main>
      {/* Mobile toggle button */}
      <div className="md:hidden flex items-center justify-between p-4 border-b">
        <Link href={"/"}>
          <Image src={Logo} alt="Company Logo" className="h-10 w-auto" />
        </Link>
        <Button variant="outline" size="icon" onClick={toggleSidebar}>
          {isSidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-background border-r transform transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? "-translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Company Logo */}
          <div className="p-4 border-b md:flex hidden justify-center items-center">
            <Link
              href={"/"}
              className="flex items-center justify-around w-full"
            >
              <Image src={Logo} alt="Company Logo" className="h-8 w-auto" />
              <span className="text-2xl font-bold tracking-wide text-primary uppercase">
                Out Loud
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-grow py-4">
            <nav className="space-y-2 px-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md p-2 transition-colors
                    ${
                      (pathname === item.href ||
                        pathname.includes(`${item.href}`)) &&
                      "text-primary bg-accent hover:bg-none hover:text-primary" // Highlight active page
                    }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </ScrollArea>

          {/* Theme Toggle */}
          <div className="p-4 border-t flex justify-between">
            <SignedOut>
              <div className="flex items-center">
                {isLoaded ? (
                  <Button variant={"outline"}>
                    <SignInButton />
                  </Button>
                ) : (
                  <Loader2 className="animate-spin" />
                )}
              </div>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center">
                {isLoaded ? (
                  <UserButton />
                ) : (
                  <Loader2 className="animate-spin" />
                )}
              </div>
            </SignedIn>
            <ThemeToggler />
          </div>
        </div>
      </div>
    </main>
  );
}
