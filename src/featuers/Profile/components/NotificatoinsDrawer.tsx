import CustomDrawer from "@/components/Global/CustomDrawer";
import NotificationsBox, {NotificationsTitle} from "@/featuers/Profile/components/NotificationsBox";
import React from "react";
interface NotificationsDrawerProps  {
    openDrawer:boolean,
    setOpenDrawer:React.Dispatch<React.SetStateAction<boolean>>,
    optimisticNotifications:any,
    setOptimisticNotifications:React.Dispatch<React.SetStateAction<any>>
}
export default function NotificationsDrawer({openDrawer,setOpenDrawer,optimisticNotifications,setOptimisticNotifications}:NotificationsDrawerProps) {

    return <CustomDrawer title={<NotificationsTitle/>} body={<NotificationsBox optimisticNotifications={optimisticNotifications} setOptimisticNotifications={setOptimisticNotifications}/>} openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}/>


}