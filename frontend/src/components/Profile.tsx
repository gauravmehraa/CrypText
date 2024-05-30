import { IoCloseOutline } from "react-icons/io5";
import { getJoinDate } from "../utils/timestamp";

const Profile = (props: { user: any }) => {
  const joinDate = getJoinDate(props.user.createdAt);
  
  return (
    <div
    className="flex gap-3 cursor-pointer"
    onClick={()=>(document.getElementById('view_profile') as HTMLDialogElement).showModal()}
    >
      <img
        src={props.user.profilePicture}  
        alt={props.user.name}
        className='w-8 h-8 rounded-full border-cryptext-black border-2 cursor-pointer'
      />
      <span className='text-cryptext-gray font-semibold active:text-cryptext-red'>{props.user.name}</span>
      <dialog id="view_profile" className="modal cursor-default">
        <div className="modal-box min-w-lg max-w-lg flex flex-col items-center text-center">
          <div className="modal-action absolute mt-0 top-4 right-4">
            <form method="dialog">
              <button className="btn btn-square btn-outline">
                <IoCloseOutline className="w-6 h-6"/>
              </button>
            </form>
          </div>
          <img
            src={props.user.profilePicture}
            alt={props.user.name}
            className='w-48 h-48 my-4'
          />
          <h3 className="font-bold text-2xl text-cryptext-white">
            {props.user.name}
          </h3>
          <p className="my-2 text-lg text-cryptext-red font-bold">@{props.user.username}</p>
          <p className="text-lg">Member since {joinDate}</p>
        </div>
      </dialog>
    </div>
  )
}

export default Profile