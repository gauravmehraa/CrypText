import React from 'react'

const Conversation = () => {
  return (
    <>
      <div className='flex gap-2 items-center hover:bg-cryptext-red hover:cursor-pointer rounded'>
        <div className='avatar online'>
          <div className='w-12 rounded-full'>
            <img src='https://avatar.iran.liara.run/public/boy/?username=GauravMehraa' alt='User avatar'/>
          </div>
        </div>
        <div className='flex flex-col flex-1'>
          <div className='flex gap-3 justify-between'>
            <p className='font-bold text-cryptext-white'>Gaurav Mehra</p>
          </div>
        </div>
      </div>
      <div className='divider my-0 py-0 h-1'/>
    </>
  )
}

export default Conversation
