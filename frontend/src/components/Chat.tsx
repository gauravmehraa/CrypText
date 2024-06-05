import { MouseEventHandler, useEffect, useState } from 'react'
import { TiMessages } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import Messages from './Messages'
import ChatBox from './ChatBox'
import useConversation from '../store/useConversation';
import { useAuthContext } from '../context/AuthContext';
import DeleteChat from './DeleteChat';
import Profile from './Profile';
import MessageInfo from './MessageInfo';

const Chat = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const [selectedMessages, setSelectedMessages] = useState<Set<React.Key>>(new Set());

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  const clearSelection: MouseEventHandler = () => {
    setSelectedMessages(new Set());
  }

  return (
    <div className='w-full md:min-w-[450px] flex flex-col h-4/5 sm:h-full'>
      {
      !selectedConversation ?
      <SplashScreen/>
      :
      <>
        <div className='flex gap-2 bg-cryptext-white min-h-12 items-center px-4 py-2 sm:mb-2 text-xl justify-between'>
          <Profile user={selectedConversation}/>
          <div className='flex gap-4'>
            {selectedMessages.size !== 0 && <IoClose className='w-5 h-5 text-cryptext-black cursor-pointer hover:text-cryptext-red' onClick={clearSelection}/>}
            {selectedMessages.size === 1 && <MessageInfo message={Array.from(selectedMessages)[0]}/>}
            <DeleteChat conversation={selectedConversation}/>
          </div>
        </div>
        <Messages selectedMessages={selectedMessages} setSelectedMessages={setSelectedMessages}/>
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
