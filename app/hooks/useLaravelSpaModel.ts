import { useState } from "react"
import Axios, { AxiosError, type AxiosResponse } from 'axios'

const useLaravelSpaModel = <T>({ url, path }: { url: string, path: string }) => {

    const laravel = Axios.create({
        baseURL: url,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
        },
        withCredentials: true,
        withXSRFToken: true
    })
    const csrf = () => laravel.get("/sanctum/csrf-cookie")

    const [ data, setData ] = useState<T[]>([])
    const [ error, setError ] = useState<AxiosError|null>(null)
    const [ loading, setLoading ] = useState<boolean>(false)

    const index = (): Promise<void> => {
        setLoading(true)
        setError(null)
        return laravel.get(path)
        .then((response: AxiosResponse<T[]>) => {
            setData(response.data)
            setLoading(false)
            return Promise.resolve()
        })
        .catch((error: AxiosError) => {
            setError(error)
            setLoading(false)
            return Promise.reject()
        })
    }

    const show = (id: string|number): Promise<T|void> => {
        setLoading(true)
        setError(null)
        return laravel.get(`${path}/${id}`)
        .then((response: AxiosResponse<T>) => {
            setLoading(false)
            return response.data
        })
        .catch((error: AxiosError) => {
            setError(error)
            setLoading(false)
            return Promise.reject()
        })
    }

    const store = async (values: any): Promise<T|void> => {
        setLoading(true)
        setError(null)
        await csrf()
        return laravel.post(path)
        .then((response: AxiosResponse<T>) => {
            setLoading(false)
            return response.data
        })
        .catch((error: AxiosError) => {
            setError(error)
            setLoading(false)
            return Promise.reject()
        })
    }

    const update = async (id: string|number, values: any): Promise<T|void> => {
        setLoading(true)
        setError(null)
        await csrf()
        return laravel.patch(`${path}/${id}`)
        .then((response: AxiosResponse<T>) => {
            setLoading(false)
            return response.data
        })
        .catch((error: AxiosError) => {
            setError(error)
            setLoading(false)
            return Promise.reject()
        })
    }

    const destroy = (id: string|number): Promise<void> => {
        setLoading(true)
        setError(null)
        return laravel.delete(`${path}/${id}`)
        .then((response: AxiosResponse) => {
            setLoading(false)
            return Promise.resolve()
        })
        .catch((error: AxiosError) => {
            setError(error)
            setLoading(false)
            return Promise.reject()
        })
    }

    return {
        data,
        error,
        loading,
        index,
        show,
        store,
        update,
        destroy
    }

}

export { useLaravelSpaModel }