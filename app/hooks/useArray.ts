import { useState } from "react"

export function useArray<T>() {

    const [ array, setArray ] = useState<T[]>([])

    const append = (item: T) => {
        setArray([ ...array, item ])
    }

    const get = (index: number) => {
        return array[index]
    }

    const set = (items: T[]) => {
        setArray(items)
    }

    return {
        array, setArray, append, get, set
    }

}
