"use client";

import Header from "@/components/Header";
import {
  FaBolt,
  FaClockRotateLeft,
  FaInstagram,
  FaLinkedinIn,
  FaRegClock,
  FaXTwitter,
} from "react-icons/fa6";
import { SelectPlatform } from "@/components/Select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { parseMarkdown } from "@/lib/markdownParser";
import { FaRegCopy } from "react-icons/fa6";
import { PiSpinnerLight } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";

function Page() {
  const [prompt, setPrompt] = useState("");
  const [platform, setPlatform] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [content, setContent] = useState("");
  const [points, setPoints] = useState("");
  const [threadsArray, setThreadsArray] = useState([]);
  const [loadingPoints, setLoadingPoints] = useState(false);

  const [selectedContent, setSelectedContent] = useState<string | null>(null);
  const [isContentVisible, setIsContentVisible] = useState(false);

  const handleThreadClick = async (content: string) => {
    const parsedContent = await parseMarkdown(content);

    setSelectedContent(parsedContent);
    setIsContentVisible(true);
  };

  useEffect(() => {
    setLoadingHistory(true);
    axios.get("/api/history").then((res) => {
      setLoadingHistory(false);
      setThreadsArray(res.data.threads);

      console.log(res.data.threads);
    });
  }, []);

  useEffect(() => {
    setLoadingPoints(true);
    axios
      .get("/api/points")
      .then((res) => {
        setLoadingPoints(false);
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

  const copyToClipboardModal = () => {
    const text = document.getElementById("contentToCopyModal")?.innerText;
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
        setLoadingPoints(true);

        return axios.get("/api/points");
      })
      .then((res) => {
        setLoadingPoints(false);
        setPoints(res.data.threads);

        setLoadingHistory(true);
        return axios.get("/api/history");
      })
      .then((res) => {
        setLoadingHistory(false);
        setThreadsArray(res.data.threads);
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
        <div className="flex flex-col gap-4 border-2 w-full sm:w-1/3 bg-neutral-100 dark:bg-neutral-900 rounded-lg px-4 py-6">
          <div className="flex items-center justify-between text-xl font-bold px-2 md:px-4">
            <div className="">History</div>
            <FaClockRotateLeft />
          </div>

          {loadingHistory && threadsArray.length == 0 && (
            <div className="flex items-center justify-center">
              <PiSpinnerLight className="animate-spin size-6" />
            </div>
          )}

          {/* items */}
          {threadsArray &&
            threadsArray.map(
              (
                thread: {
                  title: string;
                  createdAt: string;
                  platform: string;
                  content: string;
                },
                index
              ) => (
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
              )
            )}

          {isContentVisible && selectedContent && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 ">
              <div className="bg-white dark:bg-neutral-800 py-6 px-8 rounded-lg shadow-lg w-2/3 relative max-h-[70vh] overflow-scroll text-sm sm:text-base">
                <div className="flex items-center gap-4">
                  <h2 className="text-lg font-bold">Content</h2>
                  <FaRegCopy
                    onClick={copyToClipboardModal}
                    className="cursor-pointer bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 rounded-full p-2 size-8 "
                    title="Copy"
                  />
                </div>
                <div
                  className="mt-2 dark:text-neutral-200"
                  id="contentToCopyModal"
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

        {/* right */}
        <div className="w-full sm:w-2/3 flex flex-col gap-5">
          <div className="flex items-center gap-4 bg-neutral-100 dark:bg-neutral-900 rounded-lg border-2 px-6 py-4 text-neutral-700 dark:text-neutral-300">
            <FaBolt className="size-6" />
            <div>
              <div className="text-lg font-bold">Available Points</div>
              {loadingPoints && <PiSpinnerLight className="animate-spin " />}
              {!loadingPoints && <div>{points}</div>}
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
              disabled={
                !prompt || !platform || loading || parseInt(points) <= 0
              }
              onClick={onClickHandler}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <PiSpinnerLight className="animate-spin size-6 text-white" />
                  Generating...
                </div>
              ) : (
                "Generate Content (10 points)"
              )}
            </Button>
            {parseInt(points) <= 0 && (
              <div className="text-sm text-red-700 dark:text-red-500 mt-2 text-center font-bold">
                Not enough points
              </div>
            )}
          </div>

          {content && !loading && (
            <div className="bg-neutral-100 dark:bg-neutral-900 rounded-lg border-2 px-6 py-4 text-base leading-relaxed relative">
              <div
                className="pt-7 dark:text-neutral-200"
                dangerouslySetInnerHTML={{ __html: content }}
                id="contentToCopy"
              />
              <FaRegCopy
                onClick={copyToClipboard}
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
      </div>
    </div>
  );
}

export default Page;
