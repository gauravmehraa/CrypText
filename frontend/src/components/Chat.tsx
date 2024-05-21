import { useEffect } from 'react'
import { TiMessages } from "react-icons/ti";
import Messages from './Messages'
import ChatBox from './ChatBox'
import useConversation from '../store/useConversation';
import { useAuthContext } from '../context/AuthContext';
import DeleteChat from './DeleteChat';

const Chat = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <div className='w-full md:min-w-[450px] flex flex-col h-4/5 sm:h-full'>
      {
      !selectedConversation ?
      <SplashScreen/>
      :
      <>
        <div className='flex gap-2 bg-cryptext-white min-h-12 items-center px-4 py-2 mb-2 text-xl justify-between'>
          <div>
            <span className='label-text text-xl'> To: </span>
            {" "}
            <span className='text-cryptext-gray font-semibold'>{selectedConversation.name}</span>
          </div>
          <DeleteChat conversation={selectedConversation}/>
        </div>
        <Messages/>
        <ChatBox/>
      </>
    }
    </div>
  )
}

const SplashScreen = () => {
  const { authUser } = useAuthContext();
  return(
    <div className='flex items-center justify-center w-full h-full'>
      <div className='flex flex-col px-4 text-center sm:text-lg md:text-xl text-cryptext-white font-semibold items-center gap-2'>
        <p>Welcome Back <span className='sm:text-lg md:text-xl text-cryptext-red'> {authUser.name}! </span></p>
        <p>Start chatting securely</p>
        <TiMessages className='text-3xl md:text-6xl text-center'/>
      </div>
    </div>
  )
}

export default Chat;
