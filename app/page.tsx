"use client";
import { SignOutButton } from "@clerk/nextjs";
import prisma from "@/libs/PrismaClient";
import Link from "next/link";

export default function Home() {
  const testPrisma = async () => {
    try {
      const res = await fetch(`/api/test`);
      if (res.ok) {
        const data = await res.json();
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Link href="/create-trust">
        <button>Create New Trust</button>
      </Link>

      <br />
      <br />
      <SignOutButton />
    </>
  );
}
