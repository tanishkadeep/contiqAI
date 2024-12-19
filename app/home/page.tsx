"use client";

import Header from "@/components/Header";
import { FaBolt } from "react-icons/fa6";
import { SelectPlatform } from "@/components/Select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import History from "@/components/HomePage/History";

function Page() {
  const [prompt, setPrompt] = useState("");
  const [platform, setPlatform] = useState("");
  const { user } = useUser();

  function onClickHandler() {
    axios
      .post("/api/generate", {
        prompt,
        platform,
        email: user?.emailAddresses[0].emailAddress,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <Header />
      <div className="flex justify-around items-start gap-8 px-10 py-16 sm:flex-row flex-col">
        {/* left */}
        <History />

        {/* right */}
        <div className="w-full sm:w-2/3 flex flex-col gap-5">
          <div className="flex items-center gap-4 bg-neutral-100 dark:bg-neutral-900 rounded-lg border-2 px-6 py-4 text-neutral-700 dark:text-neutral-300">
            <FaBolt className="size-6" />
            <div>
              <div className="text-lg font-bold">Available Points</div>
              <div>100</div>
            </div>
          </div>

          <div className="bg-neutral-100 dark:bg-neutral-900 rounded-lg border-2 px-6 py-4 text-base">
            <div className="mb-4">
              <div className="py-2 px-1 font-semibold text-neutral-600 dark:text-neutral-300">
                Content Type
              </div>
              <SelectPlatform onPlatformChange={setPlatform} />
            </div>
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
            <Button
              className="mt-4 w-full bg-neutral-800 dark:bg-neutral-200 font-semibold"
              disabled={!prompt || !platform}
              onClick={onClickHandler}
            >
              Generate Content (10 points)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
