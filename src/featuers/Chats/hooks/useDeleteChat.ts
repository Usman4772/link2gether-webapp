import {useState} from "react";
import {deleteChatAPI} from "@/featuers/Chats/apis/api";
import {handleAPIErrors} from "@/utils/frontend/handleErrors";
import toast from "react-hot-toast";
import {useQueryClient} from "@tanstack/react-query";


export function useDeleteChat({setSelectedChat}:{setSelectedChat:any}) {
    const [deleteBtnLoading, setDeleteBtnLoading] = useState(false);
    const queryClient=useQueryClient()

    async function deleteChat(chatId: string) {
        try {
            setDeleteBtnLoading(true);
            const response = await deleteChatAPI(chatId);
            if (response?.data?.success) {
                toast.success(response?.data.message);
               await queryClient.invalidateQueries({queryKey:["conversations"]})
                setSelectedChat(null)
            }
        } catch (e) {
            handleAPIErrors(e)
        } finally {
            setDeleteBtnLoading(false);
        }
    }

    return {deleteChat, deleteBtnLoading};
}