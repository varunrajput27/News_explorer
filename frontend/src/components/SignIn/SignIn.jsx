import React, { useEffect, useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import useFormValidation from "../../hooks/useFormValidation";

const SignIn = ({
  isOpen,
  onClose,
  onLoginSubmit,
  onSignUpClick,
  hasError,
}) => {
  const { values, handleChange, errors, isValid, handleFormReset } = useFormValidation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    handleFormReset();
    setIsSubmitting(false);
  }, [isOpen, handleFormReset]);

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      onLoginSubmit(values.email, values.password);
      setIsSubmitting(false);
    }, 1000);
  }

  return (
    <PopupWithForm
      name="login"
      title="Sign in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      {/* Email Field */}
      <div className="mb-4">
        <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          id="login-email"
          name="email"
          placeholder="Enter email"
          autoComplete="on"
          value={values.email || ""}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>

      {/* Password Field */}
      <div className="mb-4">
        <label htmlFor="password-login" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          id="password-login"
          name="password"
          placeholder="Enter password"
          autoComplete="on"
          minLength="8"
          maxLength="30"
          value={values.password || ""}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
      </div>

      {/* Error Message */}
      {hasError && (
        <p className="text-red-600 text-sm text-center mb-2">
          Incorrect email or password
        </p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        aria-label="Sign in"
        disabled={!isValid || isSubmitting}
        className={`w-full py-2 rounded-md text-white font-medium flex items-center justify-center transition-colors ${
          isValid && !isSubmitting
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          "Sign in"
        )}
      </button>

      {/* Switch to Sign Up */}
      <p className="mt-4 text-sm text-center text-gray-600">
        or{" "}
        <span
          className="text-blue-600 hover:underline cursor-pointer"
          onClick={onSignUpClick}
        >
          Sign up
        </span>
      </p>
    </PopupWithForm>
  );
};

export default SignIn;

