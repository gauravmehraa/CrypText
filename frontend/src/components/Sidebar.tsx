import Search from './Search'
import Conversations from './Conversations'
import Navbar from './Navbar';

const Sidebar = () => {
  return (
    <div className='flex flex-col border-r border-slate-500 p-4 h-1/5 sm:h-full'>
      {window.innerWidth < 640 && <Navbar isBottom={false}/>}
      <Search/>
      {window.innerWidth >= 640 && <div className='divider divider-slate-100'></div>}
      {window.innerWidth >= 640 && <Conversations/>}
      {window.innerWidth >= 640 && <Navbar isBottom={true}/>}
    </div>
  )
};

export default Sidebar
