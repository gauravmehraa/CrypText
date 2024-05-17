import { useSocketContext } from '../context/SocketContext';
import useConversation from '../store/useConversation';

const Conversation = (props: {conversation: any, lastIndex: boolean}) => {
  
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected: boolean = selectedConversation?._id === props.conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline: boolean = onlineUsers.includes(props.conversation._id);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-cryptext-red hover:cursor-pointer rounded ${isSelected? "bg-cryptext-black": ""}`}
        onClick={() => setSelectedConversation(props.conversation)}
      >
        <div className={`avatar ${isOnline? 'online border-1 border-cryptext-green': ''}`}>
          <div className='w-12 rounded-full'>
            <img src={props.conversation.profilePicture} alt='User avatar'/>
          </div>
        </div>
        <div className='flex flex-col flex-1'>
          <div className='flex gap-3 justify-between'>
            <p className='font-bold text-cryptext-white'>@{props.conversation.username}</p>
          </div>
        </div>
      </div>
      {!props.lastIndex && <div className='divider my-0 py-0 h-1'/>}
    </>
  )
}

export default Conversation
