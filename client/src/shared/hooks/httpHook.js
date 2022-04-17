import { useState, useEffect, useCallback, useRef } from 'react'
import axios from 'axios'

export const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const activeHttpRequests = useRef([])

    const sendRequest = useCallback((async (url, method = 'GET', body = null) => {
        const controller = new AbortController()
        activeHttpRequests.current.push(controller)
        setIsLoading(true)
        setError(null)

        try {
            const response = await axios({
                method: method,
                url: url,
                data: body,
                withCredentials: true,
                signal: controller.signal
            })
            activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== controller.abort())
            setIsLoading(false)
            //console.log(response)
            return response.data
        } catch (error) {
            setError(error.response.data)
            setIsLoading(false)
        }
        //return () => controller.abort()

    }), [])

useEffect(() => {
    return () => {
        activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort())
    }
}, [])

    return {
        isLoading,
        error,
        sendRequest
    }
}