import React from "react";
import closeIcon from "/icons/close-icon.svg";

const PopupWithForm = (props) => {
  function handlePopupClick(evt) {
    if (evt.target.classList.contains("popup_receptive")) {
      props.onClose();
    }
  }

  return (
    <div
      className={`fixed inset-0 z-50 ${
        props.isOpen
          ? "visible opacity-100 popup_receptive"
          : "invisible opacity-0"
      } backdrop-blur-sm bg-white/10 flex justify-center items-start transition-opacity duration-300`}
      onClick={handlePopupClick}
    >
      <div className="flex flex-col w-full sm:w-[430px] bg-white rounded-xl p-6 sm:p-8 relative mt-[80px] shadow-2xl">
        {/* ❌ Close Button */}
        <button
          className="absolute -top-10 right-0 text-white text-3xl font-bold hover:opacity-70"
          onClick={props.onClose}
          aria-label="Close popup"
        >
          ×
        </button>

        {/* ✅ Title */}
        <h2 className="text-xl font-black mb-6 font-['Roboto Slab'] text-center">
          {props.title}
        </h2>

        {/* ✅ Form */}
        <form
          className="w-full flex flex-col gap-4"
          name={`form-${props.name}`}
          onSubmit={props.onSubmit}
          noValidate
        >
          {props.children}
        </form>

        {/* ✅ Bottom caption: "Already have an account? Sign in" */}
        {props.caption && props.switchText && (
          <p className="text-center text-sm mt-4">
            {props.caption}{" "}
            <span
              onClick={props.onSwitch}
              className="text-blue-600 cursor-pointer underline"
            >
              {props.switchText}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default PopupWithForm;

