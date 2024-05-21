import { Link } from 'react-router-dom';
import { IoSettingsSharp } from "react-icons/io5";
import { BiLogOut } from 'react-icons/bi';
import useLogout from '../hooks/useLogout';

const Navbar = (props: { isBottom: boolean }) => {
  const { loading, logout } = useLogout();
  return (
    <div className={`flex w-full justify-between ${props.isBottom? 'invisible sm:visible': 'visibile sm:invisible'}`}>
      
      {loading ? 
      <span className='loading loading-spinner'></span>
      :
      <button className='btn btn-circle justify-center items-center flex bg-cryptext-green hover:bg-cryptext-red/60 text-cryptext-white' onClick={logout}>
        <BiLogOut className='w-6 h-6 mx-auto mr-3 text-cryptext-white'/>
      </button>}

      {!props.isBottom && (
      <div className='flex items-center text-center font-semibold text-2xl'>
        <div className='text-cryptext-white'>Cryp</div>
        <div className='text-cryptext-red'>Text</div>
      </div>
      )}

      <Link to='settings'>
        <button className='btn btn-circle justify-center items-center flex bg-cryptext-green hover:bg-cryptext-red/60 text-cryptext-white'>
          <IoSettingsSharp className='mx-auto w-5 h-5 text-cryptext-white'/>
        </button>
      </Link>
    </div>
  )
}

export default Navbar
