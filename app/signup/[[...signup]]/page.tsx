import SignUpForm from "@/components/auth/SignUpForm";
import Logo from "@/components/icons/Logo";
import ThemeSpacer from "@/components/layout/ThemeSpacer";

const SignupPage = () => {
  return (
    <div className="h-fit w-full lg:w-[25%] flex flex-col items-center justify-center self-center mt-5">
      <Logo />
      <ThemeSpacer size="components" />
      <SignUpForm />
    </div>
  );
};

export default SignupPage;
