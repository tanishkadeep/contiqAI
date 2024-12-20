import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tiles } from "@/components/ui/tiles";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import AnimatedShinyText from "@/components/ui/animated-shiny-text";
import SparklesText from "@/components/ui/sparkles-text";

const Hero = () => {
  return (
    <AnimatedGridBackgroundSection>
      <div className="z-10 flex mb-4 sm:mb-6 items-center justify-center">
        <div
          className={cn(
            "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
          )}
        >
          <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400 text-xs sm:text-sm">
            <span>Beta version</span>
            <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedShinyText>
        </div>
      </div>

      <div
        className={
          "lg:text-6xl text-4xl md:text-5xl max-w-2xl mx-auto font-extrabold text-center mb-4 backdrop-blur-md"
        }
      >
        <SparklesText
          text="Create Engaging Content with AI"
          sparklesCount={6}
        />
      </div>

      <div className="md:text-xl text-lg text-center max-w-4xl mx-auto text-neutral-500 dark:text-neutral-400 leading-relaxed backdrop-blur-md">
        Generate high-quality content for social media in seconds. Save time and
        boost your engagement with AI-powered content creation.
      </div>
      <div className="flex justify-center items-center gap-4 mt-8">
        <Button>
          <Link href="/sign-in">Get Started</Link>
        </Button>
        <Button variant="secondary" className="border">
          <Link href="#features">Learn more</Link>
        </Button>
      </div>
    </AnimatedGridBackgroundSection>
  );
};

const AnimatedGridBackgroundSection: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  return (
    <div
      className={
        "w-full min-h-[88vh] overflow-hidden relative flex items-center justify-center shadow-md [mask-image:linear-gradient(to_right,transparent,black,black,black,black,black,transparent)] px-8 lg:px-0"
      }
    >
      <div className={"w-fit h-fit relative z-[2]"}>{children}</div>
      <div className={"absolute top-0 left-0 h-full w-full"}>
        <Tiles rows={30} cols={20} />
      </div>
    </div>
  );
};

export default Hero;
