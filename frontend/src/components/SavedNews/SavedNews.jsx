
import React, { useEffect } from "react";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList";

function SavedNews({
  currentUser,
  savedArticles,
  onRemoveArticleClick,
  onSavedArticlesPage,
  loggedIn,
  showCards,
  setShowCards,
  savedCardsArray,
  setSavedCardsArray,
}) {
  // 👇 FIX: showCards set ho raha savedArticles ke base par
  useEffect(() => {
    if (Array.isArray(savedArticles)) {
      console.log("✅ Saved Articles from DB:", savedArticles);
      setShowCards(savedArticles.slice(0, 6)); // First 6 cards
    }
  }, [savedArticles, setShowCards]);

  return (
    <>
      <SavedNewsHeader
        currentUser={currentUser}
        savedArticles={savedArticles}
      />
      <NewsCardList
        onSavedArticlesPage={onSavedArticlesPage}
        loggedIn={loggedIn}
        savedArticles={savedArticles}
        setSavedArticles={() => {}} // not needed here
        token={""}
        showCards={showCards}
        setShowCards={setShowCards}
        savedCardsArray={savedCardsArray}
        setSavedCardsArray={setSavedCardsArray}
        onRemoveArticleClick={onRemoveArticleClick}
      />
    </>
  );
}

export default SavedNews;


