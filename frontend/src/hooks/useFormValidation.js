import { useState, useCallback } from "react";

/**
 * Custom hook for form validation.
 * Tracks input values, validation errors, and form validity.
 */
const useFormValidation = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  /**
   * Handles input changes and updates form state.
   * @param {Event} event - Input change event
   */
  const handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;

    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: target.validationMessage,
    }));
    setIsValid(target.closest("form").checkValidity());
  };

  /**
   * Resets form state.
   * @param {object} newValues - New values object
   * @param {object} newErrors - New errors object
   * @param {boolean} newIsValid - New validity state
   */
  const handleFormReset = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    []
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    handleFormReset,
  };
};

export default useFormValidation;
