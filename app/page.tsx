"use client";

import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1> Trustable App Landing Page</h1>

      <br />
      <br />
      <Link href={"/signin"}>
        <button>Get Started </button>
      </Link>
    </>
  );
}
