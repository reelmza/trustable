"use client";
import { usePathname } from "next/navigation";
const Header = () => {
  const path = usePathname();

  // Check if header is needed
  if (path === "/signin" || path === "/signout" || path === "/") {
    return null;
  }
  return <div className="sticky top-0 left-0 p-5 border-b">Home Page</div>;
};

export default Header;
