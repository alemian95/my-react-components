import { useEffect, useRef } from "react";

/**
 * A custom hook that repeatedly calls a callback function at a specified interval.
 * The interval can be paused by setting delay to null.
 *
 * @param callback - Function to be called at each interval
 * @param delay - Interval duration in milliseconds. Pass null to pause.
 */
const useInterval = (callback: () => void, delay: number | null) => {
    // Store the callback function in a ref to preserve it between renders
    const savedCallback = useRef<() => void>(() => {});

    // Remember the latest callback
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval
    useEffect(() => {
        // Don't schedule if no delay is specified
        if (delay === null) {
            return;
        }

        const tick = () => {
            if (savedCallback.current) {
                savedCallback.current();
            }
        };

        // Create the interval
        const id = setInterval(tick, delay);

        // Clean up on unmount or when delay changes
        return () => clearInterval(id);
    }, [delay]);
};

export default useInterval;
