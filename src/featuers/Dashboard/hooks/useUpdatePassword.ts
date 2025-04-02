import useLogout from "@/hooks/useLogout";
import { handleLeaveCommunity } from "@/utils/backend/modules/auth/services/community.services";
import axios from "@/utils/config/axios"
import { handleAPIErrors } from "@/utils/frontend/handleErrors";
import { log } from "console";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface UpdatePasswordProps {
    old_password: string;
    new_password: string;
    confirm_password: string;
    }

function useUpdatePassword(reset:()=>void) {
    const [passwordBtnLoading, setPasswordBtnLoading] = useState(false)
    const {logout}=useLogout()
    const router=useRouter()
    async function updatePassword(data: UpdatePasswordProps) {
        setPasswordBtnLoading(true)
        try {
            const response = await axios.post("/auth/change-password", data)
            if (response?.data?.success) {
                toast.success(response?.data?.message)
                reset()
               await logout()
                router.push("/login")
           }
        } catch (error) {
            handleAPIErrors(error)
        } finally {
            setPasswordBtnLoading(false)
        }
    }

    return {updatePassword,passwordBtnLoading}
}

export default useUpdatePassword