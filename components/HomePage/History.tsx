import {
  FaInstagram,
  FaLinkedinIn,
  FaRegClock,
  FaRegCopy,
} from "react-icons/fa";
import { FaClockRotateLeft, FaXTwitter } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { PiSpinnerLight } from "react-icons/pi";
import { copyToClipboard } from "../ui/copyToClipboard";
import { Key } from "react";

interface Thread {
  title: string;
  createdAt: string;
  platform: string;
  content: string;
}

const History = ({
  loadingHistory,
  threadsArray,
  handleThreadClick,
  isContentVisible,
  selectedContent,
  setIsContentVisible,
}: {
  loadingHistory: boolean;
  threadsArray: Thread[] | null;
  handleThreadClick: (content: string) => void;
  isContentVisible: boolean;
  selectedContent: string | null;
  setIsContentVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex flex-col gap-4 border-2 w-full sm:w-1/3 bg-neutral-100 dark:bg-neutral-900 rounded-lg px-4 py-6 order-last">
      <div className="flex items-center justify-between text-xl font-bold px-2 md:px-4">
        <div className="">History</div>
        <FaClockRotateLeft />
      </div>

      {loadingHistory && threadsArray?.length == 0 && (
        <div className="flex items-center justify-center">
          <PiSpinnerLight className="animate-spin size-6" />
        </div>
      )}

      {/* items */}
      {threadsArray &&
        threadsArray.map((thread: Thread, index: Key | null | undefined) => (
          <div
            key={index}
            onClick={() => handleThreadClick(thread.content)}
            className="flex flex-col gap-4 cursor-pointer"
          >
            {/* item */}
            <div className="p-4 bg-neutral-200 dark:bg-neutral-800 rounded-lg mx-4 sm:mx-1 md:mx-4 mt-2 border-2">
              {/* platform */}
              <div className="flex items-center gap-2 font-bold">
                {thread.platform == "X" ? (
                  <FaXTwitter />
                ) : thread.platform == "Instagram" ? (
                  <FaInstagram />
                ) : thread.platform == "LinkedIn" ? (
                  <FaLinkedinIn />
                ) : (
                  ""
                )}
                <div>{thread.platform}</div>
              </div>
              {/* title */}
              <div className="my-2">{thread.title}</div>

              {/* created at */}
              <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 text-sm sm:text-xs md:text-sm ">
                <FaRegClock />
                <div>{thread.createdAt.slice(0, 10)}</div>
              </div>
            </div>
          </div>
        ))}

      {isContentVisible && selectedContent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 ">
          <div className="bg-white dark:bg-neutral-800 py-6 px-8 rounded-lg shadow-lg w-2/3 relative max-h-[70vh] overflow-scroll text-sm sm:text-base">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-bold">Content</h2>
              <FaRegCopy
                onClick={() => copyToClipboard("modal")}
                className="cursor-pointer bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 rounded-full p-2 size-8 "
                title="Copy"
              />
            </div>
            <div
              className="mt-2 dark:text-neutral-200"
              id="modal"
              dangerouslySetInnerHTML={{ __html: selectedContent }}
            />
            <IoMdClose
              onClick={() => setIsContentVisible(false)}
              className="absolute top-4 right-4 cursor-pointer text-neutral-600 dark:text-neutral-300 dark:hover:text-neutral-100 hover:text-neutral-800"
              size={24}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
