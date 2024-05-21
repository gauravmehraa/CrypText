import React from 'react'

const Setting = (props: {title: string, leftText: string, rightText: string, children: React.ReactNode}) => {
  return (
      <div className="flex mx-6 my-4 items-center px-4 text-sm sm:text-lg font-semibold flex-wrap justify-between rounded-xl bg-cryptext-gray h-16">
        { props.title }
        <div className="flex gap-2 sm:gap-3">
          <div>{ props.leftText }</div>
          <div className='flex items-center'>{ props.children }</div>
          <div>{ props.rightText }</div>
        </div>
      </div>
  )
}

export default Setting
