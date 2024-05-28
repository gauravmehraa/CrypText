import { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import { encryptPrivateKey, generateKeys } from '../utils/keys';

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async({ name, username, password, confirmPassword, gender }:
    { name: string, username: string, password: string, confirmPassword: string, gender: string }) => {
    const success: boolean = handleInputErrors({ name, username, password, confirmPassword, gender });
    if(!success) return;
      setLoading(true);
    try{

      const { publicKey, privateKey } = await generateKeys();
      const { encryptedPrivateKey, iv, salt} = await encryptPrivateKey(privateKey, password);
    
      const response: Response = await fetch("/api/auth/signup",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, username, password, confirmPassword, gender,
          publicKey: Array.from(new Uint8Array(publicKey)),
          encryptedPrivateKey: Array.from(new Uint8Array(encryptedPrivateKey)),
          iv: Array.from(new Uint8Array(iv)),
          salt: Array.from(new Uint8Array(salt))
        }),
      });

      const data = await response.json();
      if(data.error){
        throw new Error(data.error);
      }
      data.privateKey = Array.from(new Uint8Array(privateKey));

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

  return {signup, loading};
}

function handleInputErrors({ name, username, password, confirmPassword, gender }:
  { name: string, username: string, password: string, confirmPassword: string, gender: string }){
  if(!name || !username || !password || !confirmPassword || !gender){
    let emptyField: string = '';
    if(!name) emptyField = 'Name';
    else if(!username) emptyField = 'Username';
    else if(!password) emptyField = 'Password';
    else if(!confirmPassword) emptyField = 'Confirming password';
    else emptyField = 'Selecting gender';
    toast.error(`${emptyField} is required`);
    return false;
  }
  if(password !== confirmPassword){
    toast.error("Passwords should match");
    return false;
  }
  if(password.length < 6){
    toast.error("Weak password");
    return false;
  }
  return true;
}

export default useSignup;
