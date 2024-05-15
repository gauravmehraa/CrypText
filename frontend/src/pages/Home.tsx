import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'

const Home = () => {
  return (
    <div className='flex sm:h=[450px] md:h-[550px] rounder-lg overflow-hidden'>
      <Sidebar/>
      <Chat/>
    </div>
  )
}

export default Home
