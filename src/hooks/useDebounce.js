import { useRef, useEffect, useCallback } from "react";

const useDebounce = (func, delay) => {
  const debounceRef = useRef();

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const debouncedFunc = useCallback(
    (...args) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    },
    [func, delay]
  );

  return debouncedFunc;
};

export default useDebounce;
