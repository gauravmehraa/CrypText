import { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import { useKeysContext } from '../context/KeysContext';

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const { setKeys } = useKeysContext();

  const logout = async() => {
    setLoading(true);
    try{
      const response: Response = await fetch("/api/auth/logout",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if(data.error){
        throw new Error(data.error);
      }

      //cache
      localStorage.removeItem("cryptext-user");

      //context
      setAuthUser(null);
      setKeys(null);
      
    }
    catch (error){
      toast.error((error as Error).message);
    }
    finally{
      setLoading(false);
    }
  }
  return {logout, loading};
}

export default useLogout;
