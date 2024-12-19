import { Marquee } from "@/components/ui/marquee";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const MarqueeComponent = () => {
  const arr = [
    { logo: FaLinkedinIn, name: "LinkedIn" },
    { logo: FaInstagram, name: "Instagram" },
    { logo: FaXTwitter, name: "Twitter" },
  ];

  return (
    <Marquee>
      {arr.map(({ logo: Logo, name }, index) => (
        <div
          key={index}
          className="relative h-full w-fit mx-12 flex items-center justify-center text-2xl font-bold text-neutral-500 dark:text-neutral-400"
        >
          <Logo />
          <span className="ml-2">{name}</span>
        </div>
      ))}
    </Marquee>
  );
};

export default MarqueeComponent;
