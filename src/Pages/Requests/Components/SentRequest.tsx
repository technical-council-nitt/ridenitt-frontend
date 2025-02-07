import React from 'react'

export default function SentRequest({
  request
}: {
  request: any
}) {
  return (
    <li className='p-2 flex gap-2 justify-between items-start border-2 border-green-700 rounded-xl'>
      <div>
        <span className='font-semibold'>
          {request.name}
        </span>
        <br />
        <span className='text-neutral-600'>
          {request.vehicle} | {request.capacity} people sharing
        </span>
        <br />
        <span className='text-neutral-600'>
          Status: {request.status}
        </span>
      </div>
      <div className='mt-2 text-neutral-600 font-semibold text-sm'>
        {request.time}
      </div>
    </li>
  )
}
