import { ModeToggle } from "@/components/ThemeToggle";

const Header = () => {
  return (
    <div className="flex justify-between items-center px-12 md:px-24 py-4 border-b-2 shadow-md">
      <div className="md:text-2xl text-lg font-extrabold">ContiqAI</div>
      <ModeToggle />
    </div>
  );
};

export default Header;
