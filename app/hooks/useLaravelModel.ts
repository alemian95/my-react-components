import { useState } from "react"

const useLaravelModel = <T>({ url, id }: { url: string, id: string }) => {

    const [ data, setData ] = useState<T[]>([])

    const index = () => {}

    const show = () => {}

    const store = () => {}

    const update = () => {}

    const destroy = () => {}

    return {
        data,
        index,
        show,
        store,
        update,
        destroy
    }

}