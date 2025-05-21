import {handleAPIErrors} from "@/utils/frontend/handleErrors";
import {useEffect, useState} from "react";
import axios from "@/utils/config/axios";

export default function useSearch(query: string) {
    const [data, setData] = useState<any[]>()
    const [loading, setLoading] = useState(false)

    async function search(query: string) {
        if (!query || query.trim() == "") return
        try {
            setLoading(true)
            const response = await axios.get(`/search?query=${query}`)
            if (response?.data?.success) {
                setData(response?.data?.data)
            }
        } catch (error) {
            handleAPIErrors(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        search(query)
    }, [query]);
    return {
        data,
        search,
        loading
    }
}