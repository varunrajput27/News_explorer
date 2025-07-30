import React, { useEffect, useState } from "react";
import NewsCardList from "../NewsCardList/NewsCardList";
import { API_KEY, PROXY_URL } from "../../utils/constants";

const LatestNewsPage = ({
  loggedIn,
  savedArticles,
  onSaveArticleClick,
  onRemoveArticleClick,
  onSignInClick,
  showCards,
  setShowCards,
  setCards,
  cards,
}) => {
  const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
  fetch(`${PROXY_URL}?q=india&pageSize=30&sortBy=publishedAt&apiKey=${API_KEY}`)
    .then((res) => res.json())
    .then((data) => {
      setCards(data.articles); // ✅ This was missing!
      setShowCards(data.articles.slice(0, 6)); // default 6 show
    })
    .catch((err) => console.error("Failed to load news:", err))
    .finally(() => setIsLoading(false));
}, [setCards, setShowCards]);


  if (isLoading) {
    return <p className="text-center mt-10 text-gray-600">Loading Latest News...</p>;
  }

  return (
    <NewsCardList
      onSavedArticlesPage={false}
      loggedIn={loggedIn}
      cards={cards}
      savedArticles={savedArticles}
      onSaveArticleClick={onSaveArticleClick}
      onRemoveArticleClick={onRemoveArticleClick}
      onSignInClick={onSignInClick}
      showCards={showCards}
      setShowCards={setShowCards}
      isSearchResult={false}
    />
  );
};

export default LatestNewsPage;
