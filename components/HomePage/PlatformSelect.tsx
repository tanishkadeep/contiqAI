import { SelectPlatform } from "@/components/HomePage/Select";
import { Dispatch, SetStateAction } from "react";

const PlatformSelect = ({
  setPlatform,
}: {
  setPlatform: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="mb-4">
      <div className="py-2 px-1 font-semibold text-neutral-600 dark:text-neutral-300">
        Content Type
      </div>
      <SelectPlatform onPlatformChange={setPlatform} />
    </div>
  );
};

export default PlatformSelect;
