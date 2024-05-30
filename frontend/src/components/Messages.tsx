import Message from './Message'
import useGetMessages from '../hooks/useGetMessages'
import LoadingBubble from './LoadingBubble';
import { LegacyRef, MutableRefObject, useEffect, useRef, useState } from 'react';
import useListenMessages from '../hooks/useListenMessage';
import { PiChatsFill } from "react-icons/pi";
import useConversation from '../store/useConversation';

const Messages = () => {
  const { loading, messages } = useGetMessages(); 
  const { selectedConversation } = useConversation()
  const [selectedMessages, setSelectedMessages] = useState<Set<React.Key>>(new Set());
  useListenMessages();
  const lastMessage: MutableRefObject<HTMLDivElement | undefined> = useRef<HTMLDivElement>();

  useEffect(() => {
    setTimeout( () => {
      lastMessage.current?.scrollIntoView({ behavior: "smooth" });
    }, 100)
  }, [messages]);

  useEffect(() => {
    setSelectedMessages(new Set());
  }, [selectedConversation])

  const handleClick = (messageId: React.Key) => {
    setSelectedMessages(prevSelectedMessages => {
      const newSelectedMessages = new Set(prevSelectedMessages);
      if (newSelectedMessages.has(messageId)) {
        newSelectedMessages.delete(messageId);
      } else {
        newSelectedMessages.add(messageId);
      }
      return newSelectedMessages;
    });
  };

  return (
    <div className='px-1 sm:px-4 w-full flex-1 overflow-y-auto'>

      {!loading && messages.length> 0 && messages.map((message: { _id: React.Key | null | undefined; }, index: number) => (
        <div
          key={message._id}
          ref={lastMessage as LegacyRef<HTMLDivElement>}
          className={`message-container ${selectedMessages.has(message._id!) ? 'bg-cryptext-gray' : ''} rounded-lg px-2`}
          onClick={() => handleClick(message._id!)}
        >
          <Message
            message={message} 
            isSelected={selectedMessages.has(message._id!)}
          />
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