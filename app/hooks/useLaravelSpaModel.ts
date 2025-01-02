import { useState } from "react"
import Axios, { AxiosError, type AxiosResponse } from 'axios'

/**
* A custom hook to interact with a Laravel-based SPA (Single Page Application).
*
* @template T - The type of data returned by the API.
* @param {Object} options - Options for configuring the hook.
* @param {string} options.url - The base URL of the Laravel application.
* @param {string} options.path - The path to the resource in the Laravel application.
* @returns {Object} An object containing state and methods for interacting with the Laravel API.
*/
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

    /**
    * Fetches all resources from the specified path.
    *
    * @returns {Promise<void>} A promise that resolves when the data is fetched successfully.
    */
    const index = (params: { [key: string]: string | number }): Promise<void> => {
        setLoading(true)
        setError(null)
        let appendPath: string[] = []
        Object.keys(params).forEach(key => appendPath.push(`${key}=${params[key]}`))
        return laravel.get(path + (appendPath.length ? `?${appendPath.join('&')}` : ""))
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

    /**
    * Fetches a single resource by its ID.
    *
    * @param {string|number} id - The ID of the resource to fetch.
    * @returns {Promise<T|void>} A promise that resolves with the fetched data or rejects with an error.
    */
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

    /**
    * Stores a new resource.
    *
    * @param {any} values - The data for the new resource.
    * @returns {Promise<T|void>} A promise that resolves with the newly created data or rejects with an error.
    */
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

    /**
    * Updates an existing resource.
    *
    * @param {string|number} id - The ID of the resource to update.
    * @param {any} values - The new data for the resource.
    * @returns {Promise<T|void>} A promise that resolves with the updated data or rejects with an error.
    */
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

    /**
    * Deletes an existing resource.
    *
    * @param {string|number} id - The ID of the resource to delete.
    * @returns {Promise<void>} A promise that resolves when the resource is deleted successfully.
    */
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