import { useEffect, useState } from "react";
import useConversation from "../store/useConversation";
import toast from "react-hot-toast";
import { useKeysContext } from "../context/KeysContext";
import { decryptMessage } from "../utils/e2ee";
import { deriveSharedSecret, toArray, toBuffer } from "../utils/keys";
import { useAuthContext } from "../context/AuthContext";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const { keys, addKey } = useKeysContext();
  const { authUser } = useAuthContext();

  useEffect( () => {
    const getMessages = async() => {
      setLoading(true);
      try{
        const response: Response = await fetch(`/api/messages/${selectedConversation._id}`);
        
        const data = await response.json();
        if(data.error){
          throw new Error(data.error);
        }

        if(!keys || !keys[selectedConversation._id]){
          const sharedSecret = await deriveSharedSecret(toBuffer(authUser.privateKey), toBuffer(selectedConversation.publicKey));
          addKey(selectedConversation._id, toArray(sharedSecret));
          return;
        }
        
        const decryptedData = await Promise.all(data.map(async (message: any) => {
          const encryptedMessage = toBuffer(message.encryptedMessage);
          const iv = toBuffer(message.iv);
          const decryptedMessage = await decryptMessage(encryptedMessage, toBuffer(keys[selectedConversation._id]), iv);
          return {
            ...message,
            decryptedMessage: decryptedMessage
          };
        }));

        setMessages(decryptedData);
      }
      catch (error){
        toast.error((error as Error).message);
      }
      finally{
        setLoading(false);
      }
    }
    if(selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, keys]);

  return { loading, messages };
}

export default useGetMessages;