import { FaRegCopy } from "react-icons/fa";
import { copyToClipboard } from "@/components/ui/copyToClipboard";
import Skeleton from "@/components/ui/Skeleton";

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
          <Skeleton />
        </div>
      )}
    </div>
  );
};

export default ContentBox;
