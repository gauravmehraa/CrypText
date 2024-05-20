import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { Socket, io } from "socket.io-client";

interface SocketContextType{
  socket: Socket | null;
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
  onlineUsers: any[];
  setOnlineUsers: React.Dispatch<React.SetStateAction<any[]>>;
}

interface SocketContextProviderProps {
  children: React.ReactNode;
}

export const SocketContext = createContext<SocketContextType>({
  socket: null,
  setSocket: () => {},
  onlineUsers: [],
  setOnlineUsers: () => {},
});

export const useSocketContext = (): SocketContextType => useContext(SocketContext);


export const SocketContextProvider: React.FC<SocketContextProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if(authUser){
      const socket = io("http://localhost:8000", {
        query: {
          userId: authUser._id as string,
        }
      });
      setSocket(socket);

      socket.on('getOnlineUsers', (users) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.close();
        setSocket(null);
      }
    }
    else{
      if(socket){
        socket.close();
        setSocket(null);
      } 
    }
  }, [authUser]);

  return(
    <SocketContext.Provider value = {{socket, setSocket, onlineUsers, setOnlineUsers }}>
      {children}
    </SocketContext.Provider>
  )
}