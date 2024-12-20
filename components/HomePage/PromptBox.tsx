import { Textarea } from "@/components/ui/textarea";

const PromptBox = ({
  prompt,
  setPrompt,
}: {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div>
      <div className="py-2 px-1 font-semibold text-neutral-600 dark:text-neutral-300">
        Prompt
      </div>
      <Textarea
        placeholder="Enter your prompt here."
        className="bg-white dark:bg-neutral-800"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
    </div>
  );
};

export default PromptBox;
