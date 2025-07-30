import React from "react";

const SuccessfulPopup = ({ isOpen, onClose, onSignInClick }) => {
  function handlePopupClick(evt) {
    if (evt.target.classList.contains("popup_receptive")) {
      onClose();
    }
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity ${
        isOpen ? "popup_receptive bg-black bg-opacity-50" : "hidden"
      }`}
      onClick={handlePopupClick}
    >
      <div className="bg-white rounded-xl shadow-xl p-8 relative max-w-sm w-full">
        {/* Close Button */}
        <button
          type="button"
          aria-label="Close popup"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          ✕
        </button>

        {/* Popup Content */}
        <h2 className="text-xl font-semibold text-center text-gray-900 mb-4">
          Registration successfully completed!
        </h2>
        <p
          className="text-blue-600 text-center cursor-pointer hover:underline"
          onClick={onSignInClick}
        >
          Sign in
        </p>
      </div>
    </div>
  );
};

export default SuccessfulPopup;
