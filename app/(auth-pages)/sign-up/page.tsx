"use client";
import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useState } from "react";

export default function Signup({ searchParams }: { searchParams: Message }) {
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }
  const supabase = createClient();
  const handleGitHubSignIn = async () => {
    setloadingGithub(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`, // Use absolute URL
      },
    });
    if (error) {
      console.error("GitHub sign-in error:", error.message);
    }
  };
  const handleGoogleSignIn = async () => {
    setloadingGoogle(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`, // Use absolute URL
      },
    });
    if (error) {
      console.error("google sign-in error:", error.message);
    }
  };
  const [loadingGithub, setloadingGithub] = useState(false);
  const [loadingGoogle, setloadingGoogle] = useState(false);
  return (
    <>
      <form className="flex flex-col min-w-64 max-w-64 mx-auto">
        <h1 className="text-2xl font-medium">Sign up</h1>
        <p className="text-sm text text-foreground">
          Already have an account?{" "}
          <Link className="text-primary font-medium underline" href="/sign-in">
            Sign in
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            minLength={6}
            required
          />
          <SubmitButton formAction={signUpAction} pendingText="Signing up...">
            Sign up
          </SubmitButton>
          <div className="flex flex-col gap-2">
            <Button className="gap-2" onClick={handleGitHubSignIn}>
              {loadingGithub ? "Authencticating..." : `Signup With Github`}
              <FaGithub size={20} />
            </Button>
            <Button className="gap-2" onClick={handleGoogleSignIn}>
              {loadingGoogle ? "Authencticating..." : `Signup With Google`}
              <FaGoogle size={20} />
            </Button>
          </div>
          <FormMessage message={searchParams} />
        </div>
      </form>
      <SmtpMessage />
    </>
  );
}
