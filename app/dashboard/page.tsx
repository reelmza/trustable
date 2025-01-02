import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

const Dashboard = () => {
  return (
    <div>
      <h1>Your Dashboard</h1>

      <br />
      <br />

      <Link href="/create-trust">
        <button>Create New Trust</button>
      </Link>

      <br />
      <br />

      <SignOutButton redirectUrl="/signin" />
    </div>
  );
};

export default Dashboard;
