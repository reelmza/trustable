import GoogleButton from "@/components/auth/GoogleSignUp";
import SignUpForm from "@/components/auth/SignupForm";
import React from "react";

const SignupPage = () => {
  return (
    <div>
      <SignUpForm />
      <GoogleButton />
    </div>
  );
};

export default SignupPage;
