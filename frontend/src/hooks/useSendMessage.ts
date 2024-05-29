import { useState } from "react";
import useConversation from "../store/useConversation";
import toast from "react-hot-toast";
import { encryptMessage } from "../utils/e2ee";
import { deriveSharedSecret, toArray, toBuffer } from "../utils/keys";
import { useKeysContext } from "../context/KeysContext";
import { useAuthContext } from "../context/AuthContext";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const { keys, addKey } = useKeysContext();
  const { authUser } = useAuthContext();

  const sendMessage = async(message: string) => {
    setLoading(true);
    try{

      if(!keys || !keys[selectedConversation._id]){
        const sharedSecret = await deriveSharedSecret(toBuffer(authUser.privateKey), toBuffer(selectedConversation.publicKey));
        addKey(selectedConversation._id, toArray(sharedSecret));
      }
      
      if(!keys) throw new Error("Error generating key");
      
      const { encryptedMessage, iv } = await encryptMessage(message, toBuffer(keys![selectedConversation._id]));
      const response: Response = await fetch(`/api/messages/send/${selectedConversation._id}`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          encryptedMessage: toArray(encryptedMessage),
          iv: toArray(iv)
        })
      });

      const data = await response.json();
      if(data.error){
        throw new Error(data.error);
      }
      data.decryptedMessage = message;
      
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