import SignInForm from "@/components/auth/SignInForm";
import Logo from "@/components/icons/Logo";
import ThemeSpacer from "@/components/layout/ThemeSpacer";

const Signin = () => {
  return (
    <div className="h-fit w-full lg:w-[25%] flex flex-col items-center justify-center">
      <Logo />
      <ThemeSpacer size="components" />
      <SignInForm />
    </div>
  );
};

export default Signin;
