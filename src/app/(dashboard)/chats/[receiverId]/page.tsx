"use client";
import Chat from "@/featuers/Chats/components/Chat";
import useFetchConversationMessages from "@/featuers/Chats/hooks/useFetchConversationMessages";
import useFetchUserDetails from "@/featuers/Profile/hooks/useFetchUserDetails";

function Page({ params }: { params: { receiverId: string } }) {
  const { receiverId } = params;
  const { data } = useFetchUserDetails(receiverId, false);
  const { messages, chatId } = useFetchConversationMessages(receiverId);
  return (
    <Chat
      messages={messages}
      selectedChat={{
        chatId: chatId!,
        receiver: {
          id: receiverId,
          username: data?.username!,
          email: data?.email!,
          profileImage: data?.profileImage!,
        },
      }}
    />
  );
}

export default Page;
