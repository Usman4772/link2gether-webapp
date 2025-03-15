import { handleAPIErrors } from '@/utils/frontend/handleErrors';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { reportPostAPI } from '../api/api';

export interface ReportPostProps {
    postId: string | number;
    communityId: string | number | undefined;
    reason?: string;
    setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>;
    }

function useReportPost({ postId, communityId,setOpenModal=()=>{} }: ReportPostProps) {
    const [reportBtnLoading, setReportBtnLoading] = useState(false)
    const [reason,setReason]=useState(null)

    async function reportPost(reason: string) {
        try {
            setReportBtnLoading(true)
            const response = await reportPostAPI({ postId, communityId, reason });
            if (response?.data?.success) {
                toast.success(response?.data?.message);
                setOpenModal(false);
                setReason(null)
            }
        } catch (error) {
            handleAPIErrors(error);
        } finally {
            setReportBtnLoading(false)
        }
    }
    return {
        reportBtnLoading,
        reportPost,
        reason,
        setReason
}

}




export default useReportPost