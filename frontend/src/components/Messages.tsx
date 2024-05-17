import Message from './Message'
import useGetMessages from '../hooks/useGetMessages'
import LoadingBubble from './LoadingBubble';
import { LegacyRef, MutableRefObject, useEffect, useRef } from 'react';
import useListenMessages from '../hooks/useListenMessage';

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
    <div className='px-4 flex-1 overflow-auto'>

      {!loading && messages.length> 0 && messages.map((message: { _id: React.Key | null | undefined; }, index: number) => (
        <div key={message._id} ref={lastMessage as LegacyRef<HTMLDivElement>} className=''>
          <Message message={message} />
        </div>
      ))}

      {loading && [...Array(3)].map((_, index) => <LoadingBubble key={index}/>)}

      {!loading && messages.length === 0 && (
        <p className='text-center text-cryptext-white'>
          Start a conversation
          <span className='text-cryptext-red'> securely</span></p>
      )}
    </div>
  )
}

export default Messages
