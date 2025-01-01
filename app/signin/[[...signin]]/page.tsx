import SignInForm from "@/components/auth/SignInForm";
import GoogleButton from "@/components/auth/GoogleSignIn";

const Signin = () => {
  return (
    <div>
      <SignInForm />
      <GoogleButton />
    </div>
  );
};

export default Signin;
