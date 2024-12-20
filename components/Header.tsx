import { ModeToggle } from "@/components/ThemeToggle";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Logo from "@/app/icon.png";

const Header = () => {
  return (
    <div className="sticky top-0 backdrop-blur-xl">
      <div className="flex justify-between items-center px-8 sm:px-12 md:px-24 py-4 border-b-2 shadow-md max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-2">
          <Image src={Logo} alt="logo" width={35} height={35} />
          <div className="md:text-2xl text-lg font-extrabold">ContiqAI</div>
        </div>
        <div className="flex items-center gap-4 justify-center font-bold">
          <ModeToggle />
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default Header;
