import { useState, useEffect } from 'react';

export const useMessageHandler = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const clearMessages = () => {
    setError(false);
    setErrorMessage("");
    setSuccess(false);
    setSuccessMessage("");
  };

  const showError = (message) => {
    setError(true);
    setErrorMessage(message);
  };

  const showSuccess = (message) => {
    setSuccess(true);
    setSuccessMessage(message);
  };

  useEffect(() => {
    let timer;
    if (error || success) {
      timer = setTimeout(() => {
        clearMessages();
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [error, success]);

  return {
    error,
    errorMessage,
    success,
    successMessage,
    clearMessages,
    showError,
    showSuccess
  };
}; 