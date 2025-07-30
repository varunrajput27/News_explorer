import React, { useEffect, useState } from "react";
import NewsCard from "../NewsCard/NewsCard";
import { NUMBER_CARDS } from "../../utils/constants";

const NewsCardList = ({
  onSavedArticlesPage,
  loggedIn,
  cards,
  savedArticles,
  showCards,
  setShowCards,
  onSaveArticleClick,
  onRemoveArticleClick,
  onSignInClick,
  isSearchResult = false
}) => {
  const [next, setNext] = useState(isSearchResult ? 3 : 6);
  const [isButtonHidden, setIsButtonHidden] = useState(false);

  useEffect(() => {
    if (!onSavedArticlesPage && Array.isArray(cards)) {
      setShowCards(cards.slice(0, isSearchResult ? 3 : 6));
    }
  }, [cards, onSavedArticlesPage, setShowCards, isSearchResult]);

  useEffect(() => {
    if (Array.isArray(showCards) && Array.isArray(cards)) {
      setIsButtonHidden(showCards.length >= cards.length);
    }
  }, [showCards, cards]);

  const handleShowMoreCards = () => {
    const updatedNext = next + NUMBER_CARDS;
    setShowCards(cards.slice(0, updatedNext));
    setNext(updatedNext);
  };

  return (
    <section className="bg-[#f0f2f5] px-6 py-16">
      {/* <div className="max-w-7xl mx-auto"> */}
      <div className="container mx-auto px-1 sm:px-2 lg:px-8">
     {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24"> */}



        {!onSavedArticlesPage && (
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-800 tracking-tight">
            {isSearchResult ? " Search Results" : " Today's Headlines"}
          </h2>
        )}

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {Array.isArray(showCards) &&
            showCards.map((card, index) => (
              <li key={card._id || index} className="list-none">
                <NewsCard
                  data={card}
                  onSavedArticlesPage={onSavedArticlesPage}
                  loggedIn={loggedIn}
                  onSaveArticleClick={onSaveArticleClick}
                  onRemoveArticleClick={onRemoveArticleClick}
                  savedArticles={savedArticles}
                  onSignInClick={onSignInClick}
                />
              </li>
            ))}
        </ul>

        {!onSavedArticlesPage && !isButtonHidden && (
          <div className="flex justify-center mt-14">
            <button
              onClick={handleShowMoreCards}
              className="bg-white border border-gray-300 px-10 py-3 rounded-full text-gray-800 text-lg font-semibold shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-300 cursor-pointer"
            >
              Show more
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsCardList;

