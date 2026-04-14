"use client";

import React, { useEffect } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);
  useEffect(() => {
    let timer = setTimeout(() => {
   return   setDebouncedValue(value);
    }, delay);
    return ()=>clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
