"use client";

import Header from "@/components/Header";
import { FaClockRotateLeft } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";
import { FaBolt } from "react-icons/fa6";
import { SelectPlatform } from "@/components/Select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

function Page() {
  const [prompt, setPrompt] = useState("");
  const [platform, setPlatform] = useState("");
  const { user } = useUser();

  function onclickHandler() {
    axios
      .post("/api/generate", {
        prompt,
        platform: "twitter",
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
      <div className="flex justify-around items-start gap-8 px-10 py-16">
        {/* left */}
        <div className="flex flex-col gap-4 border-2  w-1/3 bg-neutral-100 dark:bg-neutral-900 rounded-lg px-4 py-6">
          <div className="flex items-center justify-between text-xl font-bold px-4">
            <div className="">History</div>
            <FaClockRotateLeft />
          </div>

          {/* items */}
          <div className=" flex flex-col gap-4">
            {/* item  */}
            <div className="p-4 bg-neutral-200 dark:bg-neutral-800 rounded-lg mx-4 mt-2 border-2">
              {/* platform */}
              <div className="flex items-center gap-2 font-bold">
                <FaXTwitter />
                <div>Twitter</div>
              </div>
              {/* title */}
              <div className="my-2">generate a thread on pizza</div>

              {/* created at */}
              <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <FaRegClock />
                <div>04/10/2024, 11:34:23</div>
              </div>
            </div>

            {/* item  */}
            <div className="p-4 bg-neutral-200 dark:bg-neutral-800 rounded-lg mx-4 mt-2 border-2">
              {/* platform */}
              <div className="flex items-center gap-2 font-bold">
                <FaXTwitter />
                <div>Twitter</div>
              </div>
              {/* title */}
              <div className="my-2">generate a thread on pizza</div>

              {/* created at */}
              <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <FaRegClock />
                <div>04/10/2024, 11:34:23</div>
              </div>
            </div>
          </div>
        </div>

        {/* right */}
        <div className="w-2/3 flex flex-col gap-5">
          {/* points */}
          <div className="flex items-center gap-4 bg-neutral-100 dark:bg-neutral-900  rounded-lg border-2 px-6 py-4 text-neutral-700 dark:text-neutral-300">
            <FaBolt className="size-6" />
            <div>
              <div className="text-lg font-bold">Available Points</div>
              <div>100</div>
            </div>
          </div>

          <div className=" bg-neutral-100 dark:bg-neutral-900  rounded-lg border-2 px-6 py-4 text-base">
            <div className="mb-4">
              <div className="py-2 px-1 font-semibold text-neutral-600 dark:text-neutral-300">
                Content Type
              </div>
              <SelectPlatform />
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
              className="mt-4 w-full bg-neutral-800  dark:bg-neutral-200  font-semibold"
              disabled={!prompt}
              onClick={onclickHandler}
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
