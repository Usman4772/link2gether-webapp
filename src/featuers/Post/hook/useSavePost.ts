import React from 'react'
import { savePostAPI } from '../api/api'
import toast from 'react-hot-toast'
import { handleAPIErrors } from '@/utils/frontend/handleErrors'
import { useQueryClient } from '@tanstack/react-query'

function useSavePost() {
    const queryClient=useQueryClient()

    async function savePost(id:string|number){
    try {
        const response = await savePostAPI(id)
        if (response?.data?.success) {
            toast.success(response?.data?.message)
            queryClient.invalidateQueries({ queryKey: ["community-details"] })
            queryClient.invalidateQueries({ queryKey: ["community-posts"] })
            queryClient.invalidateQueries({ queryKey: ["all-posts"] })
            queryClient.invalidateQueries({ queryKey: ["post", id] })

        }
    } catch (error) {
        handleAPIErrors(error)
    }
}

    
    return {
        savePost
    }
}

export default useSavePost