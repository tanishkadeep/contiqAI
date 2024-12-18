import { ModeToggle } from "@/components/ThemeToggle";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <div className="flex justify-between items-center px-12 md:px-24 py-4 border-b-2 shadow-md sticky top-0 z-50 bg-background">
      <div className="md:text-2xl text-lg font-extrabold">ContiqAI</div>
      <div className="flex items-center gap-4 justify-center">
        <ModeToggle />
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Header;
