import { MdInfo } from "react-icons/md";
import useConversation from "../store/useConversation";
import { BsInfoCircleFill } from "react-icons/bs";
import { generateTimestamp } from "../utils/timestamp";


const MessageInfo = ( props: {message: any} ) => {
  const { messages } = useConversation();
  const selectedMessage = messages.find((message: { _id: any; }) => message._id.toString() === props.message);
  const sentAt = generateTimestamp(selectedMessage.createdAt, true, false);
  const readAt = generateTimestamp(selectedMessage.readAt, true, true);

  return (
    <div>
      <MdInfo
        onClick={()=>(document.getElementById('message_info') as HTMLDialogElement).showModal()}
        className='text-cryptext-black cursor-pointer hover:text-cryptext-red'
      />
      <dialog id="message_info" className="modal cursor-default">
        <div className="modal-box min-w-lg max-w-lg flex flex-col items-center text-center">
          <div className="modal-action absolute mt-0 top-4 right-4">
            <form method="dialog">
              <button className="btn btn-square btn-outline">
                <BsInfoCircleFill className="w-6 h-6"/>
              </button>
            </form>
          </div>
          <h3 className="font-bold text-xl mt-2 mb-6 text-cryptext-white">
            { selectedMessage.decryptedMessage }
          </h3>
          <p className="text-lg">Sent at: {sentAt} </p>
          { (selectedMessage.isRead || false) ?
            <p className="text-lg text-cryptext-green"> Read at: {readAt} </p>
            :
            <p className="text-lg text-cryptext-red"> Message Unread </p>
          }
        </div>
      </dialog>
    </div>
    )
  }

export default MessageInfo;
