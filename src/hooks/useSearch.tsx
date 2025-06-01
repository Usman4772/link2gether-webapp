import {handleAPIErrors} from "@/utils/frontend/handleErrors";
import {useEffect, useState} from "react";
import axios from "@/utils/config/axios";
import useDebounce from "@/hooks/useDebounce";

export default function useSearch() {
    const [data, setData] = useState<any[]>()
    const [loading, setLoading] = useState(false)
    const [searchQuery,setSearchQuery] = useState<string>("")
    const debouncedQuery=useDebounce(searchQuery)

    async function search(debouncedQuery: string) {
        if (!debouncedQuery || debouncedQuery.trim() == "") return
        try {
            setLoading(true)
            const response = await axios.get(`/search?query=${debouncedQuery}`)
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
        search(debouncedQuery)
    }, [debouncedQuery]);
    return {
        data,
        search,
        setSearchQuery,
        searchQuery,
        loading
    }
}