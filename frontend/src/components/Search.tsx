import React from 'react';
import { IoSearchSharp } from "react-icons/io5";

const Search = () => {
  return (
    <form className='flex items-center gap-2'>
      <input type="text" placeholder='Search user' className='input input-bordered rounded-full'/>
      <button type='submit' className='btn btn-circle bg-cryptext-green text-cryptext-white'>
        <IoSearchSharp className='w-6 h-6 outline-none'/>
      </button>
    </form>
  )
}

export default Search
