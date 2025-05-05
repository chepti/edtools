import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <header className="w-full border-b bg-background sticky top-0 z-30">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-36 flex items-center gap-2">
          <Image
            src="/logo-holmin.png"
            width={48} // Adjusted width for better display
            height={48} // Adjusted height for better display
            alt="Holmin Tikshuv logo"
          />
          <span className="font-semibold text-lg">כלים AI</span> {/* Added site title next to logo */}
        </Link>

        <SignedIn>
          <nav className="md:flex-between hidden w-full max-w-xs">
            <NavItems />
          </nav>
        </SignedIn>

        <div className="flex w-32 justify-end gap-3 items-center">
          {/* Display UserButton when signed in */}
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNav />
          </SignedIn>
          {/* Display Sign In/Sign Up buttons when signed out */}
          <SignedOut>
            <Button asChild className="rounded-full" size="lg">
              <Link href="/sign-in">כניסה</Link>
            </Button>
            {/* Optional: Add Sign Up button if needed */}
            {/* <Button asChild className="rounded-full" size="lg">
              <Link href="/sign-up">הרשמה</Link>
            </Button> */}
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header; 