
import React, { useEffect, useState } from "react";

const SavedNewsHeader = ({ currentUser, savedArticles }) => {
  const [keywordArray, setKeywordArray] = useState([]);

  useEffect(() => {
    if (!Array.isArray(savedArticles)) return;

    const keywords = savedArticles
      .filter((a) => typeof a.keyword === "string" && a.keyword.trim())
      .map((a) => a.keyword.trim());

    const capitalized = keywords.map(
      (k) => k.charAt(0).toUpperCase() + k.slice(1).toLowerCase()
    );

    const freq = capitalized.reduce((acc, k) => {
      acc[k] = (acc[k] || 0) + 1;
      return acc;
    }, {});

    const sorted = Object.keys(freq).sort((a, b) => freq[b] - freq[a]);

    setKeywordArray(sorted);
  }, [savedArticles]);

  const articleCount = savedArticles?.length || 0;
  const topKeywords =
    keywordArray.length === 0
      ? "None"
      : keywordArray.length > 3
      ? `${keywordArray[0]}, ${keywordArray[1]}, and ${keywordArray.length - 2} others`
      : keywordArray.join(", ");

  return (
    <section className="bg-[#fcfcfc] pt-32 pb-16 px-6 md:px-16 border-t border-gray-200">
      <div className="max-w-5xl mx-auto space-y-8 text-[#222] font-[Georgia]">
        <div className="space-y-3">
          <p className="text-[15px] text-gray-500 uppercase tracking-wider">Your Library</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-snug">
            Name: <span className="text-[#2b2b2b]">{currentUser?.name || "User"}</span>
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-gray-700">
            You saved: <span className="font-semibold">{articleCount}</span>{" "}
            {articleCount === 1 ? "article" : "articles"}
          </h2>
        </div>

        <div className="text-lg text-gray-700">
          <span className="font-semibold">By keywords:</span>{" "}
          <span className="italic text-[#444]">{topKeywords}</span>
        </div>
      </div>
    </section>
  );
};

export default SavedNewsHeader;

