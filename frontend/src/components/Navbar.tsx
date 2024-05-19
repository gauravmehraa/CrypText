import { Link } from 'react-router-dom';
import Logout from './Logout'
import { IoSettingsSharp } from "react-icons/io5";

const Navbar = () => {
  return (
    <div className='flex w-full justify-between'>
      <Logout/>
      <Link to='settings'>
        <button className='btn mt-auto flex start bg-cryptext-green hover:bg-cryptext-red/60 text-cryptext-white'>
          <IoSettingsSharp className='w-5 h-5 mr-2 text-cryptext-white'/>
          Settings
        </button>
      </Link>
    </div>
  )
}

export default Navbar
