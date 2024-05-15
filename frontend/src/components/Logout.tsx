import React from 'react'
import { BiLogOut } from "react-icons/bi";
import useLogout from '../hooks/useLogout';

const Logout = () => {
  const { loading, logout } = useLogout();
  return (
    loading?(
      <span className='loading loading-spinner'></span>
    )
      :
      <div className='mt-auto flex cursor-pointer' onClick={logout}>
        <BiLogOut className='w-6 h-6 mr-2 text-cryptext-white'/>
        Logout
      </div>
  )
}

export default Logout
