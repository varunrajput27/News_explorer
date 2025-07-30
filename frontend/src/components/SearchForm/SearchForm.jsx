import React, { useState } from "react";
import NewsPhoto from "../../images/newsphoto.avif";
import { useNavigate } from "react-router-dom"; 

const SearchForm = ({ searchKeyword, setSearchKeyword, onSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const [placeholder, setPlaceholder] = useState("Search topics...");
  const [loading, setLoading] = useState(false);
   const navigate = useNavigate(); // initialize

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setSearchKeyword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) {
      setPlaceholder("Please enter a topic");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      onSearch(trimmed);
      setLoading(false);
      navigate("/", { state: { scrollToResults: true } });
    }, 1000);
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-gray-900 text-white px-6 overflow-hidden">
      {/* Background image */}
      <img
        src={NewsPhoto}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-40"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-black opacity-80" />

      {/* Content */}
      <div className="relative z-10 max-w-2xl w-full text-center px-4">
        <h1 className="text-4xl md:text-5xl font-semibold mb-6 tracking-tight drop-shadow-sm">
          Stay Updated With The Latest News
        </h1>
        <p className="text-gray-300 mb-12 text-lg">
          Search any topic and get instant news updates around the world.
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <input
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onChange={handleChange}
            disabled={loading}
            autoComplete="off"
            className={`flex-grow h-12 px-5 rounded-lg bg-white/10 backdrop-blur-sm border border-transparent
              placeholder-gray-400 text-white text-base
              focus:outline-none focus:ring-2 focus:ring-blue-500
              transition duration-300 shadow-md
              ${loading ? "opacity-70 cursor-not-allowed" : "hover:border-blue-500"}`}
          />

          <button
            type="submit"
            disabled={loading}
            className={`flex items-center justify-center gap-2 h-12 px-8 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700
              text-white font-semibold text-base shadow-lg
              transition-transform duration-150
              ${loading ? "opacity-70 cursor-not-allowed" : "hover:scale-105 active:scale-95"}`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Searching...
              </>
            ) : (
              "Search"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SearchForm;


