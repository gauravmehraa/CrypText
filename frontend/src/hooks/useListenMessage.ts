import { useEffect } from "react";
import useConversation from "../store/useConversation";
import { useSocketContext } from "../context/SocketContext";
import toast from "react-hot-toast";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    socket?.on('newMessage', (newMessage) => {
      if(selectedConversation._id === newMessage.senderId){
        newMessage.shouldFade = true;
        setMessages([...messages, newMessage]);
      }
      else{
        toast(`New message: ${newMessage.message}`,{
        icon: '🔔',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        }});
      }
    });

    return () => {
      socket?.off('newMessage');
    }
  }, [socket, setMessages, messages]);
}

export default useListenMessages;