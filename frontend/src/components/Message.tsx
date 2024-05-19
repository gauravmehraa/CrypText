import { useAuthContext } from '../context/AuthContext';
import useConversation from '../store/useConversation';
import { Time } from '../utils/Time';

const Message = (props: {message: any}) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe: boolean = props.message.senderId === authUser._id;
  const formattedTime = Time(props.message.createdAt);
  const profilePicture = fromMe? authUser.profilePicture: selectedConversation.profilePicture;
  const background = `bg-cryptext-${fromMe ? 'red' : 'green'}`
  const fadeClass = props.message.shouldFade? 'animate-fade': '';

  return (
    <div className={`chat ${fromMe ? 'chat-end' : 'chat-start'}`}>
      <div className='chat-image avatar w-fit'>
        <div className='w-10 rounded-full'>
          <img src={profilePicture} alt=''/>
        </div>
      </div>
      <div className={`chat-bubble text-cryptext-white ${background} ${fadeClass}`}>
        { props.message.message }
      </div>
      <div className='chat-footer opacity-70 m-1 text-xs flex gap-1 items-center'>
        { formattedTime }
      </div>
    </div>
  )
}

export default Message;
