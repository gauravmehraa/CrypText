import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../hooks/useGetConversations'

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  return (
    <div className='py-6 gap-1 flex flex-col overflow-auto h-full'>
      {conversations.map((conversation: { _id: React.Key | null | undefined; }, index: number) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIndex={index === conversations.length - 1}
        />
      ))}

      {loading?<span className='loading loading-spinner m-auto'></span>: null}
    </div>
  )
}

export default Conversations
