import { useState } from "react";
import useConversation from "../store/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async(message: string) => {
    setLoading(true);
    try{
      const response: Response = await fetch(`/api/messages/send/${selectedConversation._id}`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });

      const data = await response.json();
      if(data.error){
        throw new Error(data.error);
      }
      setMessages([...messages, data]);
    }
    catch (error){
      toast.error((error as Error).message);
    }
    finally{
      setLoading(false);
    }
  }
  return { loading, sendMessage }
}

export default useSendMessage;