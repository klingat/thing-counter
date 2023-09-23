import { useState, useEffect } from 'react';

// Custom hook for local storage
function useLocalStorage(key, initialValue) {
  // Initialize state with the value from local storage (if it exists)
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error accessing local storage:', error);
      return initialValue;
    }
  });

  // Update local storage when the state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error updating local storage:', error);
    }
  }, [key, storedValue]);

  // Delete the item from local storage
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing item from local storage:', error);
    }
  };

  return {
    storedValue, setStoredValue, removeValue
  }
}

export default useLocalStorage;
