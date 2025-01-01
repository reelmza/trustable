import GoogleButton from "@/components/auth/GoogleSignUp";
import SignupForm from "@/components/auth/SignupForm";
import React from "react";

const SignupPage = () => {
  return (
    <div>
      <SignupForm />
      <GoogleButton />
    </div>
  );
};

export default SignupPage;
