import GoogleButton from "@/components/auth/GoogleSignUp";
import SignUpForm from "@/components/auth/SignUpForm";
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
