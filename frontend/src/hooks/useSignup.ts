import { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async({ name, username, password, confirmPassword, gender }:
    { name: string, username: string, password: string, confirmPassword: string, gender: string }) => {
    const success: boolean = handleInputErrors({ name, username, password, confirmPassword, gender });
    if(!success) return;
      setLoading(true);
    try{
      const response: Response = await fetch("/api/auth/signup",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, password, confirmPassword, gender }),
      });

      const data = await response.json();
      if(data.error){
        throw new Error(data.error);
      }

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
    toast.error("All fields are required");
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
