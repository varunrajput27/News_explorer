import React, { useEffect, useRef } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import useFormValidation from "../../hooks/useFormValidation";

const Register = ({
  isOpen,
  onClose,
  onRegisterSubmit,
  onSignInClick,
  hasError,
}) => {
  const { values, handleChange, errors, isValid, handleFormReset } = useFormValidation();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const usernameRef = useRef(null);

  useEffect(() => {
    handleFormReset();
  }, [isOpen, handleFormReset]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegisterSubmit(values.email, values.password, values.name);
  }

  // Handle Enter key to move focus to next input
  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef?.current?.focus();
    }
  };

  return (
    <PopupWithForm
      name="signup"
      title="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      caption="Already have an account?"
      switchText="Sign in"
      onSwitch={onSignInClick}
    >
      {/* Email */}
      <div className="relative mb-4">
        <label htmlFor="register-email" className="text-xs text-blue-600 font-medium mb-1 block">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="register-email"
          value={values.email || ""}
          onChange={handleChange}
          placeholder="Enter email"
          required
          ref={emailRef}
          onKeyDown={(e) => handleKeyDown(e, passwordRef)}
          className="w-full px-3 py-2 border-b border-black/20 text-sm outline-none"
        />
        <p className="text-xs text-red-600 mt-1">{errors.email || ""}</p>
      </div>

      {/* Password */}
      <div className="relative mb-4">
        <label htmlFor="password-register" className="text-xs text-blue-600 font-medium mb-1 block">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password-register"
          value={values.password || ""}
          onChange={handleChange}
          placeholder="Enter password"
          minLength="8"
          maxLength="30"
          required
          ref={passwordRef}
          onKeyDown={(e) => handleKeyDown(e, usernameRef)}
          className="w-full px-3 py-2 border-b border-black/20 text-sm outline-none"
        />
        <p className="text-xs text-red-600 mt-1">{errors.password || ""}</p>
      </div>

      {/* Username */}
      <div className="relative mb-4">
        <label htmlFor="username-register" className="text-xs text-blue-600 font-medium mb-1 block">
          Username
        </label>
        <input
          type="text"
          name="name"
          id="username-register"
          value={values.name || ""}
          onChange={handleChange}
          placeholder="Enter username"
          minLength="2"
          maxLength="30"
          required
          ref={usernameRef}
          onKeyDown={(e) => e.key === "Enter" && isValid && handleSubmit(e)}
          className="w-full px-3 py-2 border-b border-black/20 text-sm outline-none"
        />
        <p className="text-xs text-red-600 mt-1">{errors.name || ""}</p>
      </div>

      {/* Error */}
      {hasError && (
        <p className="text-red-600 text-sm text-center mb-2">
          This email is unavailable
        </p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!isValid}
        className={`w-full py-3 rounded-full text-lg font-semibold transition ${
          isValid
            ? "bg-blue-600 text-white hover:bg-blue-500"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Sign up
      </button>
    </PopupWithForm>
  );
};

export default Register;


