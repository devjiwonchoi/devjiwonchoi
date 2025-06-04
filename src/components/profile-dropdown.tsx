import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { auth } from "@/lib/auth";
import { Suspense } from "react";
import { SignIn, SignOut } from "./auth-button";

async function Profile() {
  const session = await auth();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-8 cursor-pointer">
          <AvatarImage
            src={session?.user?.image || "https://github.com/devjiwonchoi.png"}
            alt={session?.user?.name || "Jiwon Choi"}
          />
          <AvatarFallback>?</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 p-2">
        {session?.user && (
          <>
            <DropdownMenuItem disabled>
              <User className="mr-2 h-4 w-4" />
              <span>{session.user.name || session.user.email}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        {session ? (
          <DropdownMenuItem asChild>
            <SignOut />
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem asChild>
            <SignIn />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export async function ProfileDropdown() {
  return (
    <Suspense
      fallback={
        <Avatar className="size-8 cursor-pointer">
          <AvatarFallback>?</AvatarFallback>
        </Avatar>
      }
    >
      <Profile />
    </Suspense>
  );
}
