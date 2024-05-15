import React from 'react'

const Message = () => {
  return (
    <div className='chat chat-end'>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img src='https://avatar.iran.liara.run/public/boy/?username=GauravMehraa' alt=''/>
        </div>
      </div>
      <div className='chat-bubble text-cryptext-white bg-cryptext-red'>
        Hello! 123
      </div>
      <div className='chat-footer opacity-70 text-xs flex gap-1 items-center'>
        69:69AM
      </div>
    </div>
  )
}

export default Message
