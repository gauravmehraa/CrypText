import { useAuthContext } from '../context/AuthContext';
import { useSettingsContext } from '../context/SettingsContext';
import useConversation from '../store/useConversation';
import { generateTimestamp} from '../utils/timestamp';
import { IoCheckmark, IoCheckmarkDone } from "react-icons/io5";

const Message = (props: {message: any, isSelected: boolean}) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const { settings } = useSettingsContext();

  const fromMe: boolean = props.message.senderId === authUser._id;
  const formattedTime = generateTimestamp(props.message.createdAt, settings?.timeFormat || false, settings?.dateStamp || false);
  const profilePicture = fromMe? authUser.profilePicture: selectedConversation.profilePicture;
  const background = `bg-cryptext-${fromMe ? 'red' : 'green'}`
  const fadeClass = props.message.shouldFade? 'animate-fade': '';

  return (
    <div className={`chat ${fromMe ? 'chat-end' : 'chat-start'} my-2 `}>
      <div className='chat-image avatar w-fit'>
        <div className='w-10 rounded-full'>
          <img src={profilePicture} alt=''/>
        </div>
      </div>
      <div className={`chat-bubble flex text-cryptext-white ${background} ${fadeClass}`}>
        { props.message.decryptedMessage }
      </div>
      <div className='chat-footer opacity-70 m-1 text-xs text-blue-500 flex gap-1 items-center'>
        { formattedTime }
        { fromMe && (props.message.isRead? <IoCheckmarkDone className='w-4 h-4'/>: <IoCheckmark className='w-4 h-4'/>)}
      </div>
    </div>
  )
}

export default Message;
