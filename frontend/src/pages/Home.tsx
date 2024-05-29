import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'

const Home = () => {
  return (
    <div className='flex flex-col sm:flex-row overflow-hidden w-full lg:w-4/5 h-full sm:h-3/4 border sm:rounded-lg border-cryptext-gray'>
      <Sidebar/>
      <Chat/>
    </div>
  )
};

export default Home;