import React from 'react'

export default function ReceivedRequest({
  request
}: {
  request: any
}) {
  return (
    <li className='p-2 border-2 border-green-700 rounded-xl'>
      <div className='flex gap-2 justify-between items-start'>

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
            Requests: {request.requests.length}
          </span>
        </div>
        <div className='mt-2 text-neutral-600 font-semibold text-sm'>
          {request.time}
        </div>
      </div>
      <ul className='flex flex-col gap-2'>
        {request.requests.map((req: any, idx: number) => (
          <li key={idx} className='text-xs flex justify-between items-center gap-4'>
            <span className=''>
              {request.name} - {request.status}
            </span>
            <div className='flex gap-2 items-center'>
              <button className='p-1 px-4 block w-fit rounded-lg border border-solid border-transparent bg-green-700 text-white'>
                Accept
              </button>
              <button className='p-1 px-4 block w-fit rounded-lg border border-solid border-red-500 bg-red-100'>
                Decline
              </button>
            </div>
          </li>
        ))}
      </ul>
    </li>
  )
}
