import Search from './Search'
import Conversations from './Conversations'
import Navbar from './Navbar';

const Sidebar = () => {
  return (
    <div className='flex flex-col border-r border-slate-500 p-4'>
      <Search/>
      <div className='divider divider-slate-100'></div>
      <Conversations/>
      <Navbar/>
    </div>
  )
};

export default Sidebar
