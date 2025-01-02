"use client";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DesktopSideBar = () => {
  const path = usePathname();

  // Check if sidebar is needed
  if (path === "/signin" || path === "/signout" || path === "/") {
    return null;
  }

  // Render Sidebar
  return (
    <div className="w-[18%] h-full hidden lg:block">
      {/* Fixed Overlay */}
      <div
        className={`fixed flex flex-col top-0 left-0 w-[18%] h-full border-r p-5`}
      >
        <h3>SideBar</h3>

        <br />
        <br />

        <Link href={"/dashboard"}>Dashboard</Link>
        <Link href={"/profile"}>Profile</Link>
        <Link href={"/create-trust"}>Trusts</Link>
        <Link href={"/payments"}>Paymnet & Billing</Link>

        <br />
        <br />
        <SignOutButton redirectUrl="/signin" />
      </div>

      {/* Underlay */}
      <div className={`w-[18%] h-full`}></div>
    </div>
  );
};

export default DesktopSideBar;
