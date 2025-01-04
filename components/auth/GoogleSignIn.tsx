"use client";

import * as React from "react";
import { OAuthStrategy } from "@clerk/types";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

export default function GoogleButton({
  loadingParams,
}: {
  loadingParams: {
    loading: string | null;
    setLoading: React.Dispatch<React.SetStateAction<string | null>>;
  };
}) {
  const { signIn } = useSignIn();
  const { signUp, setActive } = useSignUp();
  const { loading, setLoading } = loadingParams;

  if (!signIn || !signUp) return null;

  const signInWith = (strategy: OAuthStrategy) => {
    setLoading("handleSignIn");
    return signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: "/signup/sso-callback",
      redirectUrlComplete: "/dashboard",
    });
  };

  async function handleSignIn(strategy: OAuthStrategy) {
    if (!signIn || !signUp) return null;

    // If the user has an account in your application, but does not yet
    // have an OAuth account connected to it, you can transfer the OAuth
    // account to the existing user account.
    const userExistsButNeedsToSignIn =
      signUp.verifications.externalAccount.status === "transferable" &&
      signUp.verifications.externalAccount.error?.code ===
        "external_account_exists";

    if (userExistsButNeedsToSignIn) {
      const res = await signIn.create({ transfer: true });

      if (res.status === "complete") {
        setActive({
          session: res.createdSessionId,
        });
      }
    }

    // If the user has an OAuth account but does not yet
    // have an account in your app, you can create an account
    // for them using the OAuth information.
    const userNeedsToBeCreated =
      signIn.firstFactorVerification.status === "transferable";

    if (userNeedsToBeCreated) {
      const res = await signUp.create({
        transfer: true,
      });

      if (res.status === "complete") {
        setActive({
          session: res.createdSessionId,
        });
      }
    } else {
      // If the user has an account in your application
      // and has an OAuth account connected to it, you can sign them in.
      signInWith(strategy);
    }
  }

  // Render a button for each supported OAuth provider
  // you want to add to your app. This example uses only Google.
  return (
    <Button
      variant={"outline"}
      className="w-full"
      type="button"
      onClick={() => handleSignIn("oauth_google")}
      disabled={loading === "handleSignIn"}
    >
      {loading === "handleSignIn" ? (
        <Loader2 className="animate-spin" />
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
            fill="currentColor"
          />
        </svg>
      )}
      Sign in with Google
    </Button>
  );
}
