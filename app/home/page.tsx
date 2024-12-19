"use client";

import Header from "@/components/Header";
import { FaBolt } from "react-icons/fa6";
import { SelectPlatform } from "@/components/Select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import History from "@/components/HomePage/History";
import { parseMarkdown } from "@/lib/markdownParser";
import { FaRegCopy } from "react-icons/fa6";

function Page() {
  const [prompt, setPrompt] = useState("");
  const [platform, setPlatform] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [points, setPoints] = useState(100);

  useEffect(() => {
    axios
      .get("/api/points")
      .then((res) => {
        setPoints(res.data.points);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [points]);

  const copyToClipboard = () => {
    const text = document.getElementById("contentToCopy")?.innerText;
    if (text)
      navigator.clipboard
        .writeText(text)

        .catch((err) => {
          console.error("Error copying text: ", err);
        });
  };

  function onClickHandler() {
    setLoading(true);
    axios
      .post("/api/generate", {
        prompt,
        platform,
      })
      .then(async function (response) {
        const parsedContent = await parseMarkdown(response.data.content);
        setContent(parsedContent);

        return axios.get("/api/points");
      })
      .then((res) => {
        setPoints(res.data.points);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
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
              <div>{points}</div>
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
              className="mt-4 w-full bg-neutral-800 dark:bg-neutral-200 font-semibold text-wrap sm:py-0 py-7 text-sm sm:text-base"
              disabled={!prompt || !platform || loading}
              onClick={onClickHandler}
            >
              {loading ? "Generating..." : "Generate Content (10 points)"}
            </Button>
          </div>

          {content && !loading && (
            <div className="bg-neutral-100 dark:bg-neutral-900 rounded-lg border-2 px-6 py-4 text-base leading-relaxed relative">
              <div
                className="pt-7"
                dangerouslySetInnerHTML={{ __html: content }}
                id="contentToCopy"
              />
              <FaRegCopy
                onClick={copyToClipboard}
                className="absolute top-3 right-4 cursor-pointer bg-neutral-200 hover:bg-neutral-300 rounded-full p-2 size-8 "
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
      </div>
    </div>
  );
}

export default Page;
