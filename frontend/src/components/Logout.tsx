import React from 'react'
import { BiLogOut } from "react-icons/bi";
import useLogout from '../hooks/useLogout';

const Logout = () => {
  const { loading, logout } = useLogout();
  return (
    loading ? 
      <span className='loading loading-spinner'></span>
      :
      <button className='btn mt-auto flex bg-cryptext-green hover:bg-cryptext-red/60 text-cryptext-white' onClick={logout}>
        <BiLogOut className='w-6 h-6 mr-2 text-cryptext-white'/>
        Logout
      </button>
  )
}

export default Logout
