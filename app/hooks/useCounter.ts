import { useEffect, useState } from "react"

export const useCounter = (props?: {
    initialValue?: number,
    minValue?: number
    maxValue?: number
    onMinValue?: () => void
    onMaxValue?: () => void
}) => {

    const [ propsState ] = useState({
        initialValue: props ? props.initialValue ?? 0 : 0,
        minValue: props ? props.minValue ?? Number.MIN_SAFE_INTEGER : Number.MIN_SAFE_INTEGER,
        maxValue: props ? props.maxValue ?? Number.MAX_SAFE_INTEGER : Number.MAX_SAFE_INTEGER,
        onMinValue: props ? props.onMinValue: undefined,
        onMaxValue: props ? props.onMaxValue: undefined
    })

    const [ value, setValue ] = useState(propsState.initialValue)

    useEffect(() => {
        if (value >= propsState.maxValue) {
            setValue(propsState.maxValue)
            if (propsState.onMaxValue) propsState.onMaxValue()
        }
        if (value <= propsState.minValue) {
            setValue(propsState.minValue)
            if (propsState.onMinValue) propsState.onMinValue()
        }
    }, [ value ])

    const reset = () => {
        setValue(propsState.initialValue)
    }

    const increment = () => {
        setValue(value + 1)
    }

    const decrement = () => {
        setValue(value - 1)
    }

    const add = (add: number) => {
        setValue(value + add)
    }

    const subtract = (sub: number) => {
        setValue(value - sub)
    }

    return {
        value, setValue,
        add, subtract,
        reset,
        increment, decrement
    }
}