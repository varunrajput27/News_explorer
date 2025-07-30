import React, { useEffect, useState } from "react";

const NewsCard = ({
  data,
  loggedIn,
  savedArticles,
  onSavedArticlesPage,
  onSaveArticleClick,
  onRemoveArticleClick,
  onSignInClick,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [savedId, setSavedId] = useState(null);

  useEffect(() => {
    if (savedArticles && data) {
      const match = savedArticles.find(
        (article) =>
          article.link === data.url ||
          article.url === data.url ||
          article.title === data.title
      );
      setIsSaved(!!match);
      setSavedId(match ? match._id : null);
    }
  }, [savedArticles, data]);

  const handleSave = () => {
    if (!loggedIn) {
      onSignInClick();
      return;
    }

    if (isSaved) {
      onRemoveArticleClick(savedId || data._id);
    } else {
      onSaveArticleClick(data);
    }

    setIsSaved(!isSaved);
  };

  const convertDate = () => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    const articleDate = data.publishedAt || data.date;
    const newDate = new Date(articleDate?.slice(0, 10));
    return `${months[newDate.getMonth()]} ${newDate.getDate()}, ${newDate.getFullYear()}`;
  };

  const SaveButton = () => (
    <div className="group absolute top-6 right-6 z-10">
      <button
        onClick={handleSave}
        className={`w-12 h-12 flex items-center justify-center rounded-xl border transition ${
          isSaved
            ? "bg-green-100 border-green-400 hover:bg-green-200"
            : "bg-white border-gray-300 hover:bg-gray-100"
        }`}
      >
        <img
          src={
            isSaved
              ? "/icons/save-icon_marked.svg"
              : "/icons/save-icon_default.svg"
          }
          alt="Save Icon"
          className="w-12 h-12 transition-transform group-hover:scale-110"
        />
      </button>
      {!loggedIn && (
        <div className="absolute right-[70px] top-1/2 -translate-y-1/2 hidden group-hover:flex bg-white text-black px-4 py-2 rounded-lg text-sm font-medium shadow-md whitespace-nowrap">
          Sign in to save articles
        </div>
      )}
    </div>
  );

  const RemoveButton = () => (
    <div className="group absolute top-6 right-6 z-10">
      <button
        onClick={() => {
          onRemoveArticleClick(data._id);
          setIsSaved(false);
        }}
        className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-red-300 hover:bg-red-100 transition"
      >
        <img
          src="/icons/save-icon_marked.svg"
          alt="Remove"
          className="w-12 h-12 transition-transform hover:scale-110"
        />
      </button>

      <div className="absolute right-[70px] top-1/2 -translate-y-1/2 hidden group-hover:flex bg-white text-black px-4 py-2 rounded-lg text-sm font-medium shadow-md whitespace-nowrap">
        Remove from saved
      </div>
    </div>
  );

  return (
    <article className="relative max-w-[400px] h-[576px] bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 border border-gray-200">
      {onSavedArticlesPage ? (
        <>
          <RemoveButton />
          <div className="absolute top-6 left-6 bg-white rounded-xl px-4 py-1 text-sm font-medium text-gray-600 shadow">
            {data.keyword}
          </div>
          <a href={data.link} target="_blank" rel="noreferrer">
            <img
              className="w-full h-[272px] object-cover transition-transform duration-300 hover:scale-[1.03]"
              src={data.image || data.urlToImage}
              alt={data.title}
            />
            <div className="p-6">
              <p className="text-gray-500 text-sm mb-2">{convertDate()}</p>
              <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {data.title}
              </h2>
              <p className="text-gray-700 text-base mb-3 line-clamp-4">
                {data.text || data.description || "No description available."}
              </p>
              <p className="text-xs text-gray-400 uppercase tracking-wider">
                {data.source?.name || "Unknown Source"}
              </p>
            </div>
          </a>
        </>
      ) : (
        <>
          <SaveButton />
          <a href={data.url} target="_blank" rel="noreferrer">
            <img
              className="w-full h-[272px] object-cover transition-transform duration-300 hover:scale-[1.03]"
              src={data.urlToImage}
              alt={data.title}
            />
          </a>
          <div className="p-6">
            <p className="text-gray-500 text-sm mb-2">{convertDate()}</p>
            <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {data.title}
            </h2>
            <p className="text-gray-700 text-base mb-3 line-clamp-4">
              {data.description}
            </p>
            <p className="text-xs text-gray-400 uppercase tracking-wider">
              {data.source?.name}
            </p>
          </div>
        </>
      )}
    </article>
  );
};

export default NewsCard;

