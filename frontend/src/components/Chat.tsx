import React from 'react'
import { TiMessages } from "react-icons/ti";
import Messages from './Messages'
import ChatBox from './ChatBox'

const Chat = () => {
  const showSplash = true;
  return (
    <div className='md:min-w-[450px] flex flex-col'>
      {
      showSplash ? <SplashScreen/>:
      <>
      <div className='bg-cryptext-gray px-4 py-2 mb-2'>
        <span className='label-text'> To: </span>
        {" "}
        <span className='text-cryptext-red font-bold'> Gaurav Mehra </span>
      </div>
      <Messages/>
      <ChatBox/>
      </>
    }
    </div>
  )
}

const SplashScreen = () => {
  return(
    <div className='flex items-center justify-center w-full h-full'>
      <div className='flex flex-col px-4 text-center sm:text-lg md:text-xl text-cryptext-white font-semibold items-center gap-2'>
        <p>Welcome Back <span className='sm:text-lg md:text-xl text-cryptext-red'> Gaurav! </span></p>
        <p>Start chatting securely</p>
        <TiMessages className='text-3xl md:text-6xl text-center'/>
      </div>
    </div>
  )
}

export default Chat;
