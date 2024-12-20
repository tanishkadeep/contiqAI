import { PiSpinnerLight } from "react-icons/pi";
import { Button } from "@/components/ui/button";

const GenerateButton = ({
  points,
  loading,
  platform,
  onClickHandler,
  prompt,
}: {
  points: string;
  loading: boolean;
  platform: string;
  prompt: string;
  onClickHandler: () => void;
}) => {
  return (
    <div>
      <Button
        className="mt-4 w-full bg-neutral-800 dark:bg-neutral-200 font-semibold text-wrap sm:py-0 py-7 text-sm sm:text-base"
        disabled={!prompt || !platform || loading || parseInt(points) <= 0}
        onClick={onClickHandler}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <PiSpinnerLight className="animate-spin size-6 text-white dark:text-neutral-900" />
            Generating...
          </div>
        ) : (
          "Generate Content (10 points)"
        )}
      </Button>
      {parseInt(points) <= 0 && (
        <div className="text-sm text-red-700 dark:text-red-500 mt-2 text-center font-bold">
          Not enough points
        </div>
      )}
    </div>
  );
};

export default GenerateButton;
