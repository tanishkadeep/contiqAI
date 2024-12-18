import { Button } from "../ui/button";
import { Tiles } from "../ui/tiles";

const Hero = () => {
  return (
    <AnimatedGridBackgroundSection>
      <div
        className={
          "text-6xl max-w-2xl mx-auto font-extrabold text-center mb-4 backdrop-blur-md"
        }
      >
        Create Engaging Content with AI
      </div>
      <div className="text-xl text-center max-w-4xl mx-auto text-neutral-500 dark:text-neutral-400 leading-relaxed backdrop-blur-md">
        Generate high-quality content for social media in seconds. Save time and
        boost your engagement with AI-powered content creation.
      </div>
      <div className="flex justify-center items-center gap-4 mt-8">

      <Button>Get Started</Button>
      <Button variant="secondary">Learn more</Button>
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
        "w-full min-h-[88vh] overflow-hidden relative flex items-center justify-center"
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
