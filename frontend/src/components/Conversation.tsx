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
        className={`flex gap-2 p-2 items-center hover:bg-cryptext-red/80 hover:cursor-pointer rounded-xl bg-cryptext-${isSelected? "red/80" : "black"}`}
        onClick={() => setSelectedConversation(props.conversation)}
      >
        <div className={`avatar rounded-full border-2 ${isOnline? 'border-cryptext-green online': 'border-white-200'}`}>
          <div className={`w-12 rounded-full`}>
            <img src={props.conversation.profilePicture} alt='User avatar'/>
          </div>
        </div>
        <div className='flex flex-col flex-1'>
          <div className='flex gap-6 ml-1'>
            <p className='font-semibold text-cryptext-white'>
              @{props.conversation.username}
            </p>
          </div>
        </div>
      </div>
      {!props.lastIndex && <div className='divider my-0 py-0 h-1'/>}
    </>
  )
}

export default Conversation
