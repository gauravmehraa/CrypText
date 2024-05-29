import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";

interface KeysContextType{
  keys: Record<string, number[]> | null;
  setKeys: React.Dispatch<React.SetStateAction<Record<string, number[]> | null>>;
  addKey: (conversationId: string, sharedKey: number[]) => void;
}

interface KeysContextProviderProps {
  children: React.ReactNode;
}

export const KeysContext = createContext<KeysContextType>({
  keys: null,
  setKeys: () => {},
  addKey: () => {}
});

export const useKeysContext = (): KeysContextType => useContext(KeysContext);

export const KeysContextProvider: React.FC<KeysContextProviderProps> = ({ children }) => {

  const { authUser } = useAuthContext();

  const [keys, setKeys] = useState<Record<string, number[]> | null>(
    JSON.parse(localStorage.getItem(`cryptext-keys-${authUser?._id}`) || "null")
  );

  useEffect(() => {
    if (keys !== null) {
      localStorage.setItem(`cryptext-keys-${authUser?._id}`, JSON.stringify(keys));
    }
  }, [keys, authUser?._id]);

  const addKey = (conversationId: string, sharedKey: number[]) => {
    setKeys(prevKeys => {
      const newKeys = { ...prevKeys, [conversationId]: sharedKey };
      localStorage.setItem(`cryptext-keys-${authUser?._id}`, JSON.stringify(newKeys));
      return newKeys;
    });
  };

  return (
    <KeysContext.Provider value={{ keys, setKeys, addKey }}>
      {children}
    </KeysContext.Provider>
  );
};