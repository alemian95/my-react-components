import { useEffect, useRef, useCallback, useState } from 'react';

/**
 * A custom hook that executes a callback after a specified delay.
 * The timeout can be reset or cleared.
 * 
 * @param callback - Function to be executed after the delay
 * @param delay - Delay in milliseconds. Pass null to prevent execution.
 */
export const useTimeout = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef<() => void>(() => {});
  const timeoutId = useRef<NodeJS.Timeout>(undefined);
  const startTime = useRef<number|undefined>(undefined);
  const [remaining, setRemaining] = useState<number>(delay || 0);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const clear = useCallback(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      startTime.current = undefined;
    }
  }, []);

  const reset = useCallback(() => {
    clear();
    if (delay !== null && savedCallback.current) {
      startTime.current = Date.now();
      setRemaining(delay);
      timeoutId.current = setTimeout(savedCallback.current, delay);
    }
  }, [delay, clear]);

  useEffect(() => {
    if (delay !== null && savedCallback.current) {
      startTime.current = Date.now();
      timeoutId.current = setTimeout(() => {
        savedCallback.current?.();
        setRemaining(0);
      }, delay);
      
      const intervalId = setInterval(() => {
        if (startTime.current) {
          const elapsed = Date.now() - startTime.current;
          setRemaining(Math.max(0, delay - elapsed));
        }
      }, 10);

      return () => {
        clear();
        clearInterval(intervalId);
      };
    }
  }, [delay, clear]);

  return { reset, clear, remaining };
};
