import { FormEvent, useState } from 'react'
import { IoSend } from "react-icons/io5";
import useSendMessage from '../hooks/useSendMessage';

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();
    if(!message) return;
    await sendMessage(message);
    setMessage("");
  }
  
  return (
    <form className='px-4 my-3' onSubmit={handleSubmit}>
      <div className='relative w-full'>
        <input
          type='text'
          autoComplete='off'
          className='border text-sm rounded-lg block w-full p-3 bg-cryptext-gray border-gray-700 text-cryptext-white'
          placeholder='Send a message (securely)'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
          {loading? <div className='loading loading-spinner'/>: <IoSend className='text-cryptext-green hover:text-cryptext-red'/>}
        </button>
      </div>
    </form>
  )
}

export default ChatBox
