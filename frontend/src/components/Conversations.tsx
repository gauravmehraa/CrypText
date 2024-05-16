import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../hooks/useGetConversations'

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  return (
    <div className='py-6 gap-2 flex flex-col overflow-auto'>
      {conversations.map((conversation: { _id: React.Key | null | undefined; }, index: number) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIndex={index === conversations.length - 1}
        />
      ))}

      {loading?<span className='loading loading-spinner mx-auto'></span>: null}
    </div>
  )
}

export default Conversations
