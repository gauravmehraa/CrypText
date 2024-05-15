import React from 'react'
import Search from './Search'
import Conversations from './Conversations'
import Logout from './Logout'

const Sidebar = () => {
  return (
    <div className='flex flex-col border-r border-slate-500 p-4'>
      <Search/>
      <div className='divide-slate-100 px-3'></div>
      <Conversations/>
      <Logout/>
    </div>
  )
}

export default Sidebar
