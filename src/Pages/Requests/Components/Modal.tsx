export default function Modal({
  requests,
  isOpen,
  onClose
}: {
  requests: any[]
  isOpen: boolean
  onClose: () => void
}) {

  if (!isOpen) return null
  
  return (
      <div onClick={onClose} className='text-xs fixed grid place-items-center inset-0 z-[2] backdrop-blur-sm'>
        <div onClick={e => e.stopPropagation()} className='bg-white absolute left-4 right-4 max-w-md p-2 border-2 border-solid border-black rounded-xl'>
          <div className='flex justify-between gap-6 items-start'>
            <div>
              <span className='font-semibold'>
                From NITT
              </span>
              <br />
              <span className='font-semibold'>
                To Chatram Bus Stand
              </span>
              <br />
              <span>
                Car | 4 people sharing
              </span>
              <br />
              <span>
                Capacity: Full
              </span>
            </div>
            <div>
              <span>
                Today at 09:20 AM
              </span>
            </div>
          </div>
          <div className='mt-2'>
            <span className=''>
              Ride Partners
            </span>
          </div>

          <ul className='mt-2 flex flex-col gap-2 max-h-80 overflow-y-auto'>
            {requests.map((req, idx) => (
              <li key={idx} className='p-2 flex gap-2 justify-between items-start border-2 border-green-700 rounded-xl'>
                <div>
                  <span className='font-semibold'>
                    {req.name}
                  </span>
                  <br />
                  <span className='text-neutral-600'>
                    {req.vehicle} | {req.capacity} people sharing
                  </span>
                  <br />
                  <span className='text-neutral-600'>
                    Status: {req.status}
                  </span>
                </div>
                <div className='text-neutral-600 font-semibold'>
                  {req.time}
                  <button className='p-1 block w-fit ml-auto rounded-xl border border-solid border-red-500 bg-red-200'>
                    Decline
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
  )
}
