"use client";

import { useRouter } from "next/navigation";
import { signOut as signOutAction } from "@/lib/actions/auth.action";

// shadcn/ui components (adjust import paths as needed)
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function UserDropdown() {
  const router = useRouter();

  async function handleSignOut() {
    await signOutAction(); // Clears session cookie on the server
    router.push("/signIn"); // Redirect to the sign-in page
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* 
          We wrap our Button with `asChild` so the DropdownMenuTrigger 
          doesn't create extra DOM elements.
        */}
        <Button
          variant="ghost"
          className=" flex flex-row relative w-10 rounded-full p-0"
        >
          <Avatar className="h-10 w-10 hover:cursor-pointer">
            {/* Replace with a real user photo URL if available */}
            <AvatarImage src="/boy.png" alt="User Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer"
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
