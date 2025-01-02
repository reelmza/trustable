"use client";

import * as React from "react";
import { OAuthStrategy } from "@clerk/types";
import { useSignIn, useSignUp } from "@clerk/nextjs";

export default function OauthSignIn() {
  const { signIn } = useSignIn();
  const { signUp, setActive } = useSignUp();

  if (!signIn || !signUp) return null;

  const signInWith = (strategy: OAuthStrategy) => {
    return signUp.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sign-up/sso-callback",
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
    <div>
      <button onClick={() => handleSignIn("oauth_google")}>
        Sign in with Google
      </button>
    </div>
  );
}
