import SignInForm from "@/components/auth/SignInForm";

const Signin = () => {
  return (
    <div className="h-fit w-full lg:w-[25%] flex flex-col items-center justify-center">
      <h1 className="mb-5 text-lg font-semibold">Trustable</h1>

      <SignInForm />
    </div>
  );
};

export default Signin;
