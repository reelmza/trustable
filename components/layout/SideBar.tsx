"use client";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const path = usePathname();

  if (path === "/signin" || path === "/signout") {
    return null;
  }

  return (
    <>
      {/* Fixed Overlay */}
      <div
        className={`fixed flex flex-col  top-0 left-0 w-[18%] h-full border-r p-5`}
      >
        <h3>SideBar</h3>

        <br />
        <br />

        <Link href={"/"}>Dashboard</Link>
        <Link href={"/profile"}>Profile</Link>
        <Link href={"/trust"}>Trusts</Link>
        <Link href={"/payments"}>Paymnet & Billing</Link>

        <br />
        <br />
        <SignOutButton redirectUrl="/signin" />
      </div>

      {/* Underlay */}
      <div className={`w-[18%] h-full`}></div>
    </>
  );
};

export default SideBar;
