import { FaBolt } from "react-icons/fa";
import { PiSpinnerLight } from "react-icons/pi";

const AvailablePoints = ({
  loadingPoints,
  points,
}: {
  loadingPoints: boolean;
  points: string;
}) => {
  return (
    <div className="flex items-center gap-4 bg-neutral-100 dark:bg-neutral-900 rounded-lg border-2 px-6 py-4 text-neutral-700 dark:text-neutral-300">
      <FaBolt className="size-6" />
      <div>
        <div className="text-lg font-bold">Available Points</div>
        {loadingPoints && <PiSpinnerLight className="animate-spin " />}
        {!loadingPoints && <div>{points}</div>}
      </div>
    </div>
  );
};

export default AvailablePoints;
