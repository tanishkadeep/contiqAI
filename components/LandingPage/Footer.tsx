import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="border-t-2 py-12 px-16">
      <div className="flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto font-semibold gap-4 text-neutral-500 dark:text-neutral-400">
        <div className="text-lg">
          Built by
          <Link
            href={"https://tanishka-deep.vercel.app/"}
            target="_blank"
            className="underline ml-2"
          >
            tanishkadeep
          </Link>
        </div>
        <div>
          <div className="text-lg md:text-xl mb-2 font-bold">Connect with me</div>
          <div className="flex gap-4 sm:justify-end justify-center items-center">
            <Link
              href={"https://github.com/tanishkadeep"}
              target="_blank"
              className="underline ml-2"
            >
              <FaGithub className="size-5 hover:scale-110 transition-transform duration-300" />
            </Link>

            <Link
              href={"https://x.com/yestanishka"}
              target="_blank"
              className="underline ml-2"
            >
              <FaXTwitter className="size-5 hover:scale-110 transition-transform duration-300" />
            </Link>

            <Link
              href={"https://www.linkedin.com/in/tanishkadeep/"}
              target="_blank"
              className="underline ml-2"
            >
              <FaLinkedinIn className="size-5 hover:scale-110 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
