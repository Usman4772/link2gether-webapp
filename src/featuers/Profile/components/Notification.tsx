import Image from "next/image";
import Heading from "@/components/Global/Heading";
import Paragraph from "@/components/Global/Paragraph";
import { Trash } from "lucide-react";
import {NotificationProps} from "@/featuers/Profile/hooks/useFetchNotifications";
import React, {useRef} from "react";

interface Props {
  data: NotificationProps;
   deleteNotifications?:(notificationId:string)=>void;
}

export default function Notification({data,deleteNotifications=()=>{}}:Props){
    const formRef=useRef<HTMLFormElement>(null)
    return <div className={"w-full py-4 px-2 flex items-center gap-4 bg-green-100 hover:bg-green-50"} key={data?._id}>
        <Image src={data?.avatar || "/default-notification.svg"} alt={"Icon"} width={50} height={50} className={"rounded-full object-cover"} />
        <div className={"flex flex-col "}>
           <Heading text={data?.title} />
           <Paragraph text={data?.body} size={"13px"}/>
        </div>
        <form action={()=>{
            deleteNotifications(data?._id)
        }}
        ref={formRef}
        >
            <Trash className={"w-[1.5rem] h-[1.5rem] ml-auto cursor-pointer text-red-300 hover:text-red-500 transition-colors ease-in"} onClick={()=> formRef.current?.requestSubmit() }/>
        </form>
    </div>
}