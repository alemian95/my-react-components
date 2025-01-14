import { useState } from "react"

export function useArray<T>() {

    const [ array, setArray ] = useState<T[]>([])

    const append = (item: T) => {
        setArray([ ...array, item ])
    }

    const get = (index: number) => {
        if (index >= 0 && index < array.length) {
            return array[index]
        }
        return undefined
    }

    const set = (index: number, item: T) => {
        if (index >= 0 && index < array.length) {
            const newArray = [...array]
            newArray[index] = item
            setArray(newArray)
        }
    }

    const first = () => {
        return array.length > 0 ? array[0] : undefined
    }

    const last = () => {
        return array.length > 0 ? array[array.length - 1] : undefined
    }

    return {
        array, setArray, append, get, set, first, last
    }

}
