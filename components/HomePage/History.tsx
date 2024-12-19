import { FaRegClock } from "react-icons/fa";
import { FaClockRotateLeft, FaXTwitter } from "react-icons/fa6";

const History = () => {
  return (
    <div className="flex flex-col gap-4 border-2 w-full sm:w-1/3 bg-neutral-100 dark:bg-neutral-900 rounded-lg px-4 py-6">
      <div className="flex items-center justify-between text-xl font-bold px-2 md:px-4">
        <div className="">History</div>
        <FaClockRotateLeft />
      </div>

      {/* items */}
      <div className=" flex flex-col gap-4">
        {/* item  */}
        <div className="p-4 bg-neutral-200 dark:bg-neutral-800 rounded-lg mx-4 sm:mx-1 md:mx-4 mt-2 border-2">
          {/* platform */}
          <div className="flex items-center gap-2 font-bold">
            <FaXTwitter />
            <div>Twitter</div>
          </div>
          {/* title */}
          <div className="my-2">generate a thread on pizza</div>

          {/* created at */}
          <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 text-sm sm:text-xs md:text-sm ">
            <FaRegClock />
            <div className="">04/10/2024</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
