import { useAuthContext } from '../context/AuthContext';
import useConversation from '../store/useConversation';
import { Time } from '../utils/Time';

const Message = (props: {message: any}) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe: boolean = props.message.senderId === authUser._id;
  const formattedTime = Time(props.message.createdAt);
  const chatClass: string = `chat-${ fromMe ? 'end' : 'start'}`
  const profilePic = fromMe? authUser.profilePicture: selectedConversation.profilePicture;
  const bgColor = `bg-cryptext-${ fromMe ? 'red' : 'green' }`

  console.log(profilePic);

  return (
    <div className={`chat ${chatClass}`}>
      <div className='chat-image avatar w-fit'>
        <div className='w-10 rounded-full'>
          <img src={profilePic} alt=''/>
        </div>
      </div>
      <div className={`chat-bubble text-cryptext-white ${bgColor}`}>
        { props.message.message }
      </div>
      <div className='chat-footer opacity-70 text-xs flex gap-1 items-center'>
        { formattedTime }
      </div>
    </div>
  )
}

export default Message;
