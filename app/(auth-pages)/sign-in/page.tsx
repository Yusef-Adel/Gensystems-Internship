"use client";
import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
export default function Login({ searchParams }: { searchParams: Message }) {
  const [loadingGithub,setloadingGithub] = useState(false)
  const [loadingGoogle,setloadingGoogle] = useState(false)
  const supabase = createClient();
  const handleGitHubSignIn = async () => {
    setloadingGithub(true)
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
    setloadingGoogle(true)
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

  return (
    <div>
      <form className="flex-1 flex flex-col min-w-64">
        <h1 className="text-2xl font-medium">Sign in</h1>
        <p className="text-sm text-foreground">
          Don't have an account?{" "}
          <Link
            className="text-foreground font-medium underline"
            href="/sign-up"
          >
            Sign up
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              className="text-xs text-foreground underline"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            required
          />
          <SubmitButton pendingText="Signing In..." formAction={signInAction}>
            Sign in
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
      <div className="flex gap-2">
        <Button className="gap-2" onClick={handleGitHubSignIn}>
          {loadingGithub ? 'Authenticating...' : 'Sign in with Github'} <FaGithub size={20} />
        </Button>
        <Button className="gap-2" onClick={handleGoogleSignIn}>
        {loadingGoogle ? 'Authenticating...' : 'Sign in with Google'} <FaGoogle size={20} />
        </Button>
      </div>
    </div>
  );
}
