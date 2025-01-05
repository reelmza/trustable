"use client";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../icons/Logo";
import ThemeSpacer from "./ThemeSpacer";
import {
  BookOpenCheck,
  CreditCard,
  LayoutDashboard,
  LucideLayoutDashboard,
  User,
} from "lucide-react";
import { Button } from "../ui/button";

const DesktopSideBar = () => {
  const path = usePathname();

  // Check if sidebar is needed
  if (
    path === "/signin" ||
    path === "/signup" ||
    path === "/signup/sso-callback" ||
    path === "/"
  ) {
    return null;
  }

  // Render Sidebar
  return (
    <div className="w-[18%] h-full hidden lg:block">
      {/* Fixed Overlay */}
      <div
        className={`fixed flex flex-col top-0 left-0 w-[18%] h-full border-r p-5`}
      >
        {/* Sidebar logo */}
        <div>
          <Logo />
        </div>
        <ThemeSpacer size="components" />

        {/* Sidebar menus */}
        <div className="flex flex-col text-gray-800 text-sm">
          {/* Dashboard */}
          <Link href={"/dashboard"}>
            <div className="flex items-center bg-gray-100 h-8 px-3 rounded-sm font-semibold gap-2">
              <LayoutDashboard size={20} strokeWidth={1.5} />
              <span>Dashboard</span>
            </div>
          </Link>
          <ThemeSpacer size="elements" />

          <Link href={"/profile"}>
            <div className="flex items-center hover:bg-gray-100 h-8 px-3 rounded-sm gap-2">
              <User size={20} strokeWidth={1.5} />
              <span>Profile</span>
            </div>
          </Link>
          <ThemeSpacer size="elements" />

          <Link href={"/create-trust"}>
            <div className="flex items-center hover:bg-gray-100 h-8 px-3 rounded-sm gap-2">
              <BookOpenCheck size={16} strokeWidth={1.5} />
              <span>Trusts</span>
            </div>
          </Link>
          <ThemeSpacer size="elements" />

          <Link href={"/payments"}>
            <div className="flex items-center hover:bg-gray-100 h-8 px-3 rounded-sm gap-2">
              <CreditCard size={20} strokeWidth={1.5} />
              <span>Payment & Billing</span>
            </div>
          </Link>
        </div>
        <ThemeSpacer size="components" />

        {/* Sidebar footer */}
        <div className="">
          <SignOutButton redirectUrl="/signin">
            <Button className="w-full">Sign out</Button>
          </SignOutButton>
        </div>
      </div>

      {/* Underlay - ignore this element */}
      <div className={`w-[18%] h-full`}></div>
    </div>
  );
};

export default DesktopSideBar;
