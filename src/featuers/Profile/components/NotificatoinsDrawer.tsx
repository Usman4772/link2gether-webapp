import CustomDrawer from "@/components/Global/CustomDrawer";
import NotificationsBox, {NotificationsTitle} from "@/featuers/Profile/components/NotificationsBox";
import React from "react";
interface NotificationsDrawerProps  {
    openDrawer:boolean,
    setOpenDrawer:React.Dispatch<React.SetStateAction<boolean>>,
    notifications:any,
    setNotifications:React.Dispatch<React.SetStateAction<any>>
}
export default function NotificationsDrawer({openDrawer,setOpenDrawer,notifications,setNotifications}:NotificationsDrawerProps) {

    return <CustomDrawer title={<NotificationsTitle notifications={notifications}/>} body={<NotificationsBox notifications={notifications} setNotifications={setNotifications}/>} openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}/>

}