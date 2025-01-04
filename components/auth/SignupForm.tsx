"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import ThemeSpacer from "../layout/ThemeSpacer";

import GoogleButton from "./GoogleSignUp";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";

export default function SignUpForm() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [verifying, setVerifying] = useState(true);

  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<{ type: string; text: string } | null>(
    null
  );
  const [code, setCode] = useState("");
  const router = useRouter();

  // Handle submission of the sign-up form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    // Start the sign-up process using the email and password provided
    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      // Set 'verifying' true to display second form
      // and capture the OTP code
      setVerifying(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle the submission of the verification form
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.push("/dashboard");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  // Display the verification form to capture the OTP code
  if (verifying) {
    return (
      <>
        <form
          onSubmit={handleVerify}
          className="w-full bg-white border p-5 rounded-md lg:shadow-sm"
        >
          {/* Form heading */}
          <h3 className="font-semibold text-xl text-center">Verify Email</h3>
          <ThemeSpacer size="elements" />

          <input
            value={code}
            id="code"
            name="code"
            onChange={(e) => setCode(e.target.value)}
          />

          <ThemeSpacer size="components" />
          <Button type="submit" className="w-full">
            Verify
          </Button>
        </form>
      </>
    );
  }

  // Display the initial sign-up form to capture the email and password
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white border p-5 rounded-md lg:shadow-sm"
      >
        {/* Form heading */}
        <h3 className="font-semibold text-xl text-center">Create an Account</h3>
        <ThemeSpacer size="elements" />

        {/* Form description */}
        <p className="text-gray-600 text-center text-sm">
          You can signup with your social account
        </p>
        <ThemeSpacer size="components" />

        {/* Google sign in */}
        <GoogleButton />
        <ThemeSpacer size="components" />

        {/* "Or sign-in" with separator */}
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-white text-gray-600 px-2">
            Or register account
          </span>
        </div>
        <ThemeSpacer size="components" />

        {/* Name inputs */}
        <div className="w-full flex flex-wrap lg:flex-nowrap items-center justify-between gap-2">
          {/* First Name */}
          <div className="w-full lg:w-[50%]">
            <Label htmlFor="firstName">First Name</Label>
            <ThemeSpacer size="elements" />

            <Input
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full"
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Moses"
              required
            />
          </div>

          {/* Last Name */}
          <div className="w-full lg:w-[50%]">
            <Label htmlFor="lastName">Last Name</Label>
            <ThemeSpacer size="elements" />

            <Input
              onChange={(e) => setLastName(e.target.value)}
              className="w-full"
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Kwagga"
              required
            />
          </div>
        </div>
        <ThemeSpacer size="elements" />

        {/* Email input */}
        <div>
          <Label htmlFor="email">Email</Label>
          <ThemeSpacer size="elements" />

          <Input
            onChange={(e) => setEmailAddress(e.target.value)}
            id="email"
            name="email"
            type="email"
            value={emailAddress}
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
          Already have an account?{" "}
          <Link href="/signin" className="underline underline-offset-4">
            Sign in
          </Link>
        </div>
      </form>
      <div id="clerk-captcha" />
    </>
  );
}
