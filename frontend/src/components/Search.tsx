import { FormEvent, useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";
import useConversation from '../store/useConversation';
import useGetConversations from '../hooks/useGetConversations';
import toast from 'react-hot-toast';

const Search = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if(!search) return;
    if(search.length < 3) return toast.error("Username too short");

    const conversation = conversations.find((c: any) => c.name.toLowerCase().includes(search.toLowerCase()));
    if(conversation){
      setSelectedConversation(conversation);
    }
    else{
      toast.error("No user found");
    }
  }

  return (
    <form className='flex items-center gap-2' onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder='Search user'
        className='input input-bordered rounded-full'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type='submit' className='btn btn-circle bg-cryptext-green text-cryptext-white'>
        <IoSearchSharp className='w-6 h-6 outline-none'/>
      </button>
    </form>
  )
}

export default Search
