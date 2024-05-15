import { createContext, useContext, useState } from "react";

interface AuthContextType{
  authUser: any;
  setAuthUser: React.Dispatch<React.SetStateAction<any>>;
}

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  authUser: null,
  setAuthUser: () => {}
});

export const useAuthContext = () => {
  return useContext(AuthContext);
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("cryptext-user") as string) || null
  );
  return(
    <AuthContext.Provider value = {{authUser, setAuthUser}}>
      {children}
    </AuthContext.Provider>
  )
}