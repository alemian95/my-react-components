import { useEffect, useRef } from "react"

const useInterval = (callback: () => void, delay: number | null) => {
    const savedCallback = useRef<() => void>(() => {})

    // Ricorda l'ultima funzione di callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback])

    // Imposta e pulisci l'intervallo.
    useEffect(() => {
        if (delay === null) return

        const tick = () => {
            if (savedCallback.current) {
                savedCallback.current()
            }
        };

        const id = setInterval(tick, delay)
        return () => clearInterval(id)
    }, [delay])
};

export default useInterval