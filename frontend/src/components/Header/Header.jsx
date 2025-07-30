import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logoutWhite from "/icons/menu-logout-white_icon.svg";
import logoutBlack from "/icons/menu-logout-black_icon.svg";
import MenuHamburgerWhiteIcon from "/icons/menu-white_icon.svg";
import MenuHamburgerBlackIcon from "/icons/menu-black_icon.svg";
import MenuCloseBlackIcon from "/icons/menu-close-black_icon.svg";
import { UserCog } from "lucide-react";

const Header = ({
  loggedIn,
  handleSignIn,
  onSignInClick,
  onLogOut,
  currentUser,
  onSavedArticlesPage,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    onLogOut();
    navigate("/");
  };

  const handleNavigationClick = () => setIsMenuOpen(false);
  const handleHomeClick = () => {
    setIsMenuOpen(false);
    navigate("/");
  };

  const isLightBg =
    isScrolled ||
    onSavedArticlesPage ||
    location.pathname === "/saved-articles" ||
    location.pathname === "/developer";

  const logoColor = isMenuOpen
    ? "text-gray-900"
    : isLightBg
    ? "text-gray-900"
    : "text-white";

  const textColor = isMenuOpen
    ? "text-gray-900"
    : isLightBg
    ? "text-gray-800"
    : "text-white";

  const borderColor = isMenuOpen || isLightBg ? "border-gray-300" : "border-white";
  const hoverEffect =
    "hover:bg-blue-100 hover:text-blue-800 transition-all duration-200";

  const hamburgerIcon = isMenuOpen
    ? MenuCloseBlackIcon
    : isLightBg
    ? MenuHamburgerBlackIcon
    : MenuHamburgerWhiteIcon;

  const logoutIcon = isMenuOpen || isLightBg ? logoutBlack : logoutWhite;

  return (
    <header
      ref={overlayRef}
      className={`fixed top-0 z-50 w-full transition duration-300 ${
        isMenuOpen || isScrolled || isLightBg ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-4 flex justify-between items-center relative min-h-[72px] sm:min-h-[80px]">
        <NavLink
          to="/"
          onClick={handleHomeClick}
          className={`font-['Roboto Slab'] text-2xl font-bold tracking-tight transition-colors ${logoColor}`}
        >
          NewsRoom
        </NavLink>

        {/* Desktop Nav */}
        <nav className={`hidden sm:flex items-center gap-6 ${textColor} font-medium`}>
          <NavLink to="/" onClick={handleHomeClick} className="hover:text-blue-600 transition">
            Home
          </NavLink>

          {loggedIn && (
            <NavLink
              to="/saved-articles"
              onClick={handleNavigationClick}
              className="hover:text-blue-600 transition"
            >
              Saved Articles
            </NavLink>
          )}

          {loggedIn ? (
            <>
              <button
                onClick={handleLogout}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border ${borderColor} ${textColor} ${hoverEffect} shadow-sm`}
              >
                <span>Logout</span>
                <img src={logoutIcon} alt="logout" className="w-5 h-5" />
              </button>
              <NavLink
                to="/developer"
                onClick={handleNavigationClick}
                className="hover:text-blue-600"
              >
                <UserCog className="w-6 h-6" />
              </NavLink>
            </>
          ) : (
            <>
              <button
                onClick={onSignInClick}
                className={`rounded-full border ${borderColor} ${textColor} px-5 py-2 ${hoverEffect} shadow-sm`}
              >
                Sign In
              </button>
              <NavLink
                to="/developer"
                onClick={handleNavigationClick}
                className="hover:text-blue-600"
              >
                <UserCog className="w-6 h-6" />
              </NavLink>
            </>
          )}
        </nav>

        {/* Mobile Menu Icon */}
        <img
          src={hamburgerIcon}
          alt="menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="sm:hidden w-7 h-7 cursor-pointer hover:scale-110 transition-transform"
        />
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white text-black absolute top-full left-0 w-full py-6 px-6 flex flex-col items-center gap-6 z-40 shadow-md text-center">
          <NavLink to="/" onClick={handleHomeClick} className="text-lg font-semibold">
            Home
          </NavLink>

          {loggedIn && (
            <NavLink
              to="/saved-articles"
              onClick={handleNavigationClick}
              className="text-lg font-semibold"
            >
              Saved Articles
            </NavLink>
          )}

          {loggedIn ? (
            <button
              onClick={() => {
                setIsMenuOpen(false);
                handleLogout();
              }}
              className="flex items-center gap-2 text-lg font-semibold border border-black px-4 py-2 rounded-full"
            >
              <span>Logout</span>
              <img src={logoutBlack} alt="logout" className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => {
                setIsMenuOpen(false);
                onSignInClick();
              }}
              className="border border-black px-6 py-2 rounded-full text-lg font-semibold"
            >
              Sign In
            </button>
          )}

          <NavLink
            to="/developer"
            onClick={handleNavigationClick}
            className="text-lg font-semibold"
          >
            Developer
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Header;





