import { SparklesText } from "../ui/sparkles-text";

function Header() {
  // const [notifications, setNotifications] = useState<any>([])
  // const socket = useMemo(() => {
  //   const socket=getSocket()
  //   socket.connect()
  //   return socket
  // }, [])

  // useEffect(() => {
  //   if (socket) {
  //     socket.on("receive-notification", (data) => {
  //       console.log(data,'data');
  //       setNotifications((prev:any) => [...prev, data]);
  //     });
  //   }
  //   return () => {
  //     if (socket) {
  //       socket.disconnect();
  //     }
  //   };
  // },[socket])
  return (
    <header className="p-4  rounded-tl-2xl border border-b-slate-200  dark:border-neutral-700 bg-white dark:bg-neutral-900  w-full flex items-center justify-between">
      <div>Breadcrumbs</div>
      <SparklesText text="LinkToGether" className="text-[18px]" />
      <div className="flex items-center gap-4">
        <div>Chat</div>
        <div>Notification</div>
      </div>
    </header>
  );
}

export default Header;
