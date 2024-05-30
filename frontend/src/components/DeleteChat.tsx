import { BsFillTrash3Fill } from "react-icons/bs";
import useDeleteMessage from "../hooks/useDeleteMessage";
import useConversation from "../store/useConversation";
import { MouseEvent } from "react";

const DeleteChat = ( props: {conversation: any} ) => {

  const { deleteAllMessages, loading } = useDeleteMessage();
  const { setMessages } = useConversation(); 

  const handleSubmit = async(e: MouseEvent) => {
    await deleteAllMessages(props.conversation);
    setMessages([]);
  }

  return (
  <div>
    <BsFillTrash3Fill
      onClick={()=>(document.getElementById('delete_confirmation') as HTMLDialogElement).showModal()}
      className='text-cryptext-black cursor-pointer hover:text-cryptext-red'
    />
    <dialog id="delete_confirmation" className="modal">
      <div className="modal-box w-11/12 max-w-xl">
        <h3 className="font-bold text-xl text-cryptext-white">Delete your converastion with
          <span className="text-xl font-bold text-cryptext-red"> {props.conversation.name} </span>?
        </h3>
        <p className="py-4 text-lg">Messages once deleted cannot be recovered.</p>
        <p className="text-sm text-cryptext-white/10">poof. gone.</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn m-2 btn-info">Close</button>
            <button className="btn m-2 btn-success" type='submit' onClick={handleSubmit}>
              { loading ? <span className='loading loading-spinner'></span>: "Delete" }
            </button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
  )
}

export default DeleteChat;
