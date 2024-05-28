import { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import { decryptPrivateKey } from '../utils/keys';

const toBuffer = (array: Uint8Array): ArrayBuffer => {
  return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset)
}

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async(username: string, password: string) => {
    const success: boolean = handleInputErrors(username, password);
    if(!success) return;

    setLoading(true);
    try{
      const response: Response = await fetch("/api/auth/login",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      if(data.error){
        throw new Error(data.error);
      }
      const encryptedPrivateKeyBuffer = toBuffer(new Uint8Array(data.encryptedPrivateKey.data));
      const ivBuffer = toBuffer(new Uint8Array(data.iv.data));
      const saltBuffer = toBuffer(new Uint8Array(data.salt.data));
      const privateKey = await decryptPrivateKey(encryptedPrivateKeyBuffer, password, ivBuffer, saltBuffer);

      data.privateKey = Array.from(new Uint8Array(privateKey));
      delete data.encryptedPrivateKey;
      delete data.iv;
      delete data.salt;

      //cache
      localStorage.setItem("cryptext-user", JSON.stringify(data));

      //context
      setAuthUser(data);
      
    }
    catch (error){
      toast.error((error as Error).message);
    }
    finally{
      setLoading(false);
    }
  }
  return {login, loading};
}

function handleInputErrors(username: string, password: string){
  if(!username){
    toast.error("Username cannot be blank");
    return false;
  }
  if(!password){
    toast.error("Enter password");
    return false;
  }
  return true;
}

export default useLogin;
