"use client";

import Header from "@/components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { parseMarkdown } from "@/lib/markdownParser";
import History from "@/components/HomePage/History";
import AvailablePoints from "@/components/HomePage/AvailablePoints";
import PlatformSelect from "@/components/HomePage/PlatformSelect";
import PromptBox from "@/components/HomePage/PromptBox";
import GenerateButton from "@/components/HomePage/GenerateButton";
import ContentBox from "@/components/HomePage/ContentBox";

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
    axios.get("/api/user");

    setLoadingHistory(true);
    axios.get("/api/history").then((res) => {
      setLoadingHistory(false);
      setThreadsArray(res.data.threads);
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

  function onClickHandler() {
    setLoading(true);
    setPrompt("");
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
        <History
          loadingHistory={loadingHistory}
          threadsArray={threadsArray}
          handleThreadClick={handleThreadClick}
          isContentVisible={isContentVisible}
          selectedContent={selectedContent}
          setIsContentVisible={setIsContentVisible}
        />

        {/* right */}
        <div className="w-full sm:w-2/3 flex flex-col gap-5">
          <AvailablePoints loadingPoints={loadingPoints} points={points} />

          <div className="bg-neutral-100 dark:bg-neutral-900 rounded-lg border-2 px-6 py-4 text-base">
            <PlatformSelect setPlatform={setPlatform} />

            <PromptBox prompt={prompt} setPrompt={setPrompt} />

            <GenerateButton
              points={points}
              loading={loading}
              platform={platform}
              onClickHandler={onClickHandler}
              prompt={prompt}
            />
          </div>

          <ContentBox content={content} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default Page;
