import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'

const Home = () => {
  return (
    <div className='flex justify-between overflow-hidden xl:w-1/2 lg:w-full h-3/4 border rounded-lg border-cryptext-gray'>
      <Sidebar/>
      <Chat/>
    </div>
  )
};

export default Home;