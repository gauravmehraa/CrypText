import { useState } from "react";
import toast from "react-hot-toast";

const useDeleteMessage = () => {
  const [loading, setLoading] = useState(false);

  const deleteMessages = async(conversation: any) => {
    setLoading(true);
    try{
      const response: Response = await fetch(`/api/messages/clear/${conversation._id}`,{
        method: "DELETE",
      });
      const data = await response.json();
      if(data.error){
        throw new Error(data.error);
      }
      toast.success("Messages successfully deleted.")
    }
    catch (error){
      toast.error((error as Error).message);
    }
    finally{
      setLoading(false);
    }
  }
  return { loading, deleteMessages }
}

export default useDeleteMessage;