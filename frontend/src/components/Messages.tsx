import Message from './Message'
import useGetMessages from '../hooks/useGetMessages'
import LoadingBubble from './LoadingBubble';
import { LegacyRef, MutableRefObject, useEffect, useRef } from 'react';
import useListenMessages from '../hooks/useListenMessage';
import { PiChatsFill } from "react-icons/pi";

const Messages = () => {
  const { loading, messages } = useGetMessages(); 
  useListenMessages();
  const lastMessage: MutableRefObject<HTMLDivElement | undefined> = useRef<HTMLDivElement>();

  useEffect(() => {
    setTimeout( () => {
      lastMessage.current?.scrollIntoView({ behavior: "smooth" });
    }, 100)
  }, [messages]);
  return (
    <div className='px-4 w-full flex-1 overflow-y-auto'>

      {!loading && messages.length> 0 && messages.map((message: { _id: React.Key | null | undefined; }, index: number) => (
        <div key={message._id} ref={lastMessage as LegacyRef<HTMLDivElement>} className=''>
          <Message message={message} />
        </div>
      ))}

      {loading && [...Array(3)].map((_, index) => <LoadingBubble key={index}/>)}

      {!loading && messages.length === 0 && (
        <div className='flex flex-col items-center w-full justify-evenly min-h-36'>
          <p className='text-center text-cryptext-red text-xl text-bold mt-4'>
            Start a conversation
            <span className='text-cryptext-white text-xl text-bold'> securely</span>
          </p>
          <PiChatsFill className='w-20 h-20 text-cryptext-green'/>
        </div>
      )}
    </div>
  )
}

export default Messages
