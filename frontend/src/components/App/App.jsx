// ✅ App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import NewsInfoSection from "../NewsInfoSection/NewsInfoSection";
import Footer from "../Footer/Footer";
import SignIn from "../SignIn/SignIn";
import Register from "../Register/Register";
import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from "../Preloader/Preloader";
import NotFoundResults from "../NotFoundResults/NotFoundResults";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import SuccessfulPopup from "../SuccessfulPopup/SuccessfulPopup";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import mainApi from "../../utils/MainApi";
import newsApi from "../../utils/NewsApi";
import * as auth from "../../utils/auth";
import LatestNews from "../LatestNews/LatestNews";
import SavedNews from "../SavedNews/SavedNews";
import { jwtDecode } from "jwt-decode";
import Developer from "../Developer/Developer";

function App() {
  const navigate = useNavigate();
  const location = useLocation().pathname.substring(1);
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem("jwt"));
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isNewsCardListOpen, setIsNewsCardListOpen] = useState(false);
  const [onSavedArticlesPage, setOnSavedArticlesPage] = useState(false);
  const [isSuccessfulPopupOpen, setIsSuccessfulPopupOpen] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);
  const [showCards, setShowCards] = useState([]);
  const [savedCardsArray, setSavedCardsArray] = useState([]);
  const [searchCards, setSearchCards] = useState([]);
  const [latestShowCards, setLatestShowCards] = useState([]);
  const [searchShowCards, setSearchShowCards] = useState([]);
  const [loginError, setLoginError] = useState(false);
  const [latestCards, setLatestCards] = useState([]);
  // const searchResultsRef = useRef(null);

  useEffect(() => {
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    auth
      .checkToken(jwt)
      .then((userData) => {
        setLoggedIn(true);
        setToken(jwt);

        setCurrentUser(userData); // ✅ Set from API
        localStorage.setItem("user", JSON.stringify(userData)); //
      })
      .catch(() => {
        setLoggedIn(false);
        setCurrentUser(null);
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");
      })
      .finally(() => setIsCheckingToken(false));
  } else {
    setIsCheckingToken(false);
  }
}, []);


  useEffect(() => {
    if (loggedIn && token) {
      mainApi
        .getArticles(token)
        .then((articles) => {
          setSavedArticles(articles.data || articles);
        })
        .catch((err) => {
          console.error("❌ Error loading articles:", err);
        });
    }
  }, [loggedIn, token]);

  useEffect(() => {
    setOnSavedArticlesPage(location === "saved-articles");
  }, [location]);

  useEffect(() => {
    function handleEscapeClose(evt) {
      if (evt.key === "Escape") closeAllPopups();
    }
    document.addEventListener("keydown", handleEscapeClose);
    return () => document.removeEventListener("keydown", handleEscapeClose);
  }, []);

  function handleSearchSubmit(keyword) {
    setSearchKeyword(keyword);
    setIsNewsCardListOpen(false);
    setIsLoading(true);
    setHasError(false);

    newsApi
      .searchArticles(keyword)
      .then((res) => {
        setSearchCards(res);
        setSearchShowCards(res.slice(0, 3));
        setHasResults(res.length > 0);
        setIsNewsCardListOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setHasError(true);
      })
      .finally(() => setIsLoading(false));
  }

  const handleSaveArticle = (article) => {
    const keyword = searchKeyword || "General";
    mainApi
      .saveArticle(article, keyword, token)
      .then((saved) => {
        setSavedArticles([...savedArticles, saved.data || saved]);
      })
      .catch((err) => console.error("Error saving article:", err));
  };
 
function handleRemoveArticle(id) {
  mainApi
    .removeArticle(id, token)
    .then(() => {
      setSavedArticles((prev) => prev.filter((item) => item._id !== id)); // 🛠 use 'id' directly
    })
    .catch(console.log);
}

  function handleLoginSubmit(email, password) {
    setLoginError(false);
    auth
      .login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setToken(data.token);
          
          return auth.checkToken(data.token);
        } else {
          throw new Error("No token received");
        }
      })
      .then((userData) => {
        setLoggedIn(true);
        setCurrentUser(userData);
         localStorage.setItem("user", JSON.stringify(userData)); 
        closeAllPopups();
        navigate("/");
      })
      .catch(() => setLoginError(true));
  }

  function handleLogOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    setToken(null);
    setCurrentUser({});
    navigate("/");
  }

  function handleRegisterSubmit(email, password, name) {
    auth
      .register(email, password, name)
      .then((res) => {
        if (res) {
          setIsRegistered(true);
          handleRegister();
        } else {
          setIsRegistered(false);
          setHasError(true);
        }
      })
      .catch((err) => {
        console.log(`Registration error: ${err.message}`);
        setHasError(true);
      });
  }

  function handleRegister() {
    setHasError(false);
    setIsSignUpOpen(false);
    setIsSuccessfulPopupOpen(true);
  }

  function closeAllPopups() {
    setIsSignInOpen(false);
    setIsSignUpOpen(false);
    setIsSuccessfulPopupOpen(false);
  }

  function handleSignInClick() {
    setHasError(false);
    setLoginError(false);
    setIsSignInOpen(true);
    setIsSignUpOpen(false);
    setIsSuccessfulPopupOpen(false);
  }

  function handleSignUpClick() {
    setHasError(false);
    setIsSignUpOpen(true);
    setIsSignInOpen(false);
  }

  if (isCheckingToken)
    return <div className="text-center mt-10">Loading...</div>;

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="min-h-screen w-full mx-auto bg-white text-[#1a1b22] font-sans antialiased">
        <Header
          loggedIn={loggedIn}
          currentUser={currentUser}
          setLoggedIn={setLoggedIn}
          onSignInClick={handleSignInClick}
          setIsNewsCardListOpen={setIsNewsCardListOpen}
          setSearchKeyword={setSearchKeyword}
          onSavedArticlesPage={onSavedArticlesPage}
          onLogOut={handleLogOut}
        />
        

        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchForm
                  onSearch={handleSearchSubmit}
                  searchKeyword={searchKeyword}
                  setSearchKeyword={setSearchKeyword}
                  setIsNewsCardListOpen={setIsNewsCardListOpen}
                />

                {!isLoading && isNewsCardListOpen && hasResults && (
                  <NewsCardList
                    onSavedArticlesPage={false}
                    loggedIn={loggedIn}
                    cards={searchCards || []}
                    savedArticles={savedArticles}
                    onSaveArticleClick={handleSaveArticle}
                    onRemoveArticleClick={handleRemoveArticle}
                    showCards={searchShowCards}
                    setShowCards={setSearchShowCards}
                    onSignInClick={handleSignInClick}
                    isSearchResult={true}
                  />
                )}

                {isLoading && <Preloader />}

                <LatestNews
                  loggedIn={loggedIn}
                  savedArticles={savedArticles}
                  onSaveArticleClick={handleSaveArticle}
                  onRemoveArticleClick={handleRemoveArticle}
                  onSignInClick={handleSignInClick}
                  showCards={latestShowCards}
                  setShowCards={setLatestShowCards}
                  cards={latestCards}
                  setCards={setLatestCards}
                />

                {!isLoading && isNewsCardListOpen && !hasResults && (
                  <NotFoundResults hasError={hasError} />
                )}

                <NewsInfoSection /> 
              </>
            }
          />

          <Route
            path="/saved-articles"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <SavedNews
                  currentUser={currentUser}
                  savedArticles={savedArticles}
                  onRemoveArticleClick={handleRemoveArticle}
                  onSavedArticlesPage={onSavedArticlesPage}
                  loggedIn={loggedIn}
                  showCards={showCards}
                  setShowCards={setShowCards}
                  savedCardsArray={savedCardsArray}
                  setSavedCardsArray={setSavedCardsArray}
                />
              </ProtectedRoute>
            }
          />
             <Route path="/developer" element={<Developer />} />
        </Routes>

        <SignIn
          isOpen={isSignInOpen}
          onClose={closeAllPopups}
          onSignUpClick={handleSignUpClick}
          onLoginSubmit={handleLoginSubmit}
          hasError={loginError}
        />

        <Register
          isOpen={isSignUpOpen}
          onClose={closeAllPopups}
          onSignInClick={handleSignInClick}
          onRegisterSubmit={handleRegisterSubmit}
          hasError={hasError}
        />

        <SuccessfulPopup
          isOpen={isSuccessfulPopupOpen}
          onClose={closeAllPopups}
          onSignInClick={handleSignInClick}
          isRegistered={isRegistered}
        />

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
