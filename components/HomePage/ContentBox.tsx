import { FaRegCopy } from "react-icons/fa";
import { copyToClipboard } from "@/components/ui/copyToClipboard";

const ContentBox = ({
  content,
  loading,
}: {
  content: string;
  loading: boolean;
}) => {
  return (
    <div>
      {content && !loading && (
        <div className="bg-neutral-100 dark:bg-neutral-900 rounded-lg border-2 px-6 py-4 text-base leading-relaxed relative">
          <div
            className="pt-7 dark:text-neutral-200"
            dangerouslySetInnerHTML={{ __html: content }}
            id="contentToCopy"
          />
          <FaRegCopy
            onClick={() => copyToClipboard("contentToCopy")}
            className="absolute top-3 right-4 cursor-pointer bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 rounded-full p-2 size-8 "
            title="Copy"
          />
        </div>
      )}

      {loading && (
        <div className="bg-neutral-100 dark:bg-neutral-900 rounded-lg border-2 px-6 py-4 text-base leading-relaxed">
          <div
            className={
              "flex w-full h-8 items-center gap-4 max-w-sm animate-pulse"
            }
          >
            <div
              className={
                "w-full h-full flex flex-col items-start justify-start gap-3"
              }
            >
              <div
                className={
                  "w-full dark:bg-neutral-800 bg-neutral-300 h-full rounded-lg"
                }
              />
              <div
                className={
                  "w-2/3 dark:bg-neutral-800 bg-neutral-300 h-full rounded-lg"
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentBox;
