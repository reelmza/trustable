"use client";

import { useState, FormEvent } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import GoogleButton from "./GoogleSignIn";
import ThemeSpacer from "../layout/ThemeSpacer";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function SignInForm() {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();

  // Component states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<{ text: string; type: string } | null>(
    null
  );

  // Handle the submission of the sign-in form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    setLoading("handleSubmit");
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        setLoading(null);
        router.push("/dashboard");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        setLoading(null);
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setLoading(null);
      console.error(JSON.stringify(err, null, 2));

      // Catch errors
      if (err?.status === 400) {
        setError({
          text: "Please login with your social account.",
          type: "form",
        });
        return;
      }

      if (err?.status === 422) {
        setError({
          text: "Incorrect password entered.",
          type: "form",
        });
        return;
      }

      setError({
        text: "Something went wrong",
        type: "form",
      });
    }
  };

  // Display a form to capture the user's email and password
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white border p-5 rounded-md lg:shadow-sm"
      >
        {/* Form heading */}
        <h3 className="font-semibold text-xl text-center">Welcome Back</h3>
        <ThemeSpacer size="elements" />

        {/* Form description */}
        <p className="text-gray-600 text-center text-sm">
          Login with your social account to proceed
        </p>
        <ThemeSpacer size="components" />

        {/* Google sign in */}
        <GoogleButton loadingParams={{ loading, setLoading }} />
        <ThemeSpacer size="components" />

        {/* "Or sign-in" with separator */}
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-white text-gray-600 px-2">
            Or continue with
          </span>
        </div>
        <ThemeSpacer size="components" />

        {/* Email input */}
        <div>
          <Label htmlFor="email">Email</Label>
          <ThemeSpacer size="elements" />

          <Input
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            type="email"
            value={email}
            placeholder="you@gmail.com"
            required
          />
        </div>
        <ThemeSpacer size="elements" />

        {/* Password input */}
        <div>
          <Label htmlFor="password">Password</Label>
          <ThemeSpacer size="elements" />

          <Input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            type="password"
            value={password}
            required
          />
        </div>

        {/* Error Box */}
        {error?.type === "form" ? (
          <div className="my-2 text-red-600 text-sm">{error?.text}</div>
        ) : (
          <ThemeSpacer size="components" />
        )}

        {/* Submit button */}
        <Button type="submit" className="w-full">
          {loading === "handleSubmit" ? (
            <Loader2 className="animate-spin" />
          ) : (
            ""
          )}
          Sign In
        </Button>
        <ThemeSpacer size="components" />

        {/* Footer */}
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </form>

      <div id="clerk-captcha" />
    </>
  );
}
