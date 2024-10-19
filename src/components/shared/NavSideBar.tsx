"use client";
import {
  HelpCircle,
  Home,
  LayoutDashboard,
  Loader2,
  Menu,
  X,
} from "lucide-react";
import { ThemeToggler } from "./ThemeToggler";
import { useState } from "react";
import { Button } from "../ui/button";
// import Image from "next/image";
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

// NAVBAR ITEMS
const navItems = [
  { icon: Home, label: "Home", href: "/home" },
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: HelpCircle, label: "Contact Us", href: "/contact-us" },
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
        <h2 className="text-xl uppercase font-bold text-primary">Out Loud</h2>
        <Button variant="outline" size="icon" onClick={toggleSidebar}>
          {isSidebarOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
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
            <div>
              {/* <Image
                src="/placeholder.svg?height=40&width=40&text=Logo"
                alt="Company Logo"
                className="h-8 w-auto"
              /> */}
              <span className="text-2xl font-bold tracking-wide text-primary uppercase">Out Loud</span>
            </div>
          </div>

          {/* User Profile */}
          {/* <div className="p-4 border-b">
            <div className="flex items-center space-x-4">
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-muted-foreground">
                  john@example.com
                </p>
              </div>
            </div>
          </div> */}

          {/* Navigation */}
          <ScrollArea className="flex-grow py-4">
            <nav className="space-y-2 px-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md p-2 transition-colors
                    ${
                      pathname === item.href && "text-primary bg-accent" // Highlight active page
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
              {/* <div>
                <p className="font-medium text-sm">{user?.username}</p>
                <p className="text-sm text-muted-foreground">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>
              </div> */}
            </SignedIn>
            <ThemeToggler />
          </div>
        </div>
      </div>
    </main>
  );
}
