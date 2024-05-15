import React from 'react'
import { BsSend } from "react-icons/bs";

const ChatBox = () => {
  return (
    <form className='px-4 my-3'>
      <div className='relative w-full'>
        <input
          type='text'
          className='border text-sm rounded-lg block w-full p-2.5 bg-cryptext-gray border-gray-600 text-cryptext-white'
          placeholder='Send a message'
        />
        <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
          <BsSend/>
        </button>
      </div>
    </form>
  )
}

export default ChatBox
