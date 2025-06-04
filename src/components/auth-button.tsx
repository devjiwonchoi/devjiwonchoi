"use client";

import { signIn, signOut } from "next-auth/react";
import { LogIn, LogOut } from "lucide-react";
import { Button } from "./ui/button";

export function SignIn() {
  return (
    <div
      className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
      onClick={() => signIn()}
    >
      <LogIn className="mr-2 h-4 w-4" />
      Sign in
    </div>
  );
}

export function SignOut() {
  return (
    <Button onClick={() => signOut()}>
      <LogOut className="mr-2 h-4 w-4" />
      Sign out
    </Button>
  );
}
