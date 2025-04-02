import { useEffect, useState } from "react";

export default function useDebounce(value: string | number, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timeout);
  }, [value]);
  return debouncedValue;
}
