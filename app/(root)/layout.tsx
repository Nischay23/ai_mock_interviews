import { isAuthenticated } from "@/lib/actions/auth.action";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { UserDropdown } from "@/components/DropDown";

const RootLayout = async ({
  children,
}: {
  children: ReactNode;
}) => {
  const isUserAuthnicated = await isAuthenticated();

  if (!isUserAuthnicated) {
    redirect("/signIn");
  }
  return (
    <div className="root-layout">
      <nav className="flex items-center justify-between w-full ">
        <Link
          href={"/"}
          className="flex items-center gap-2"
        >
          <Image
            src={"/logo.svg"}
            alt="logo"
            width={38}
            height={40}
          />
          <h2 className="text-primary-100">PrepWise</h2>
        </Link>

        <UserDropdown />
      </nav>

      {children}
    </div>
  );
};
export default RootLayout;
