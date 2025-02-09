import React from 'react'
import Modal from './Modal'

export default function ReceivedRequest({
  request
}: {
  request: any
}) {
  const [open, setOpen] = React.useState(false)

  const handleCardClick = () => {
    setOpen(true)
  }

  const handleModalClose = () => {
    setOpen(false)
  }

  return (
    <>
      {open && (
        <Modal
          requests={request.requests}
          isOpen={open}
          onClose={handleModalClose}
        />
      )}

      <li onClick={handleCardClick} role="button" className='p-2 border-2 border-green-700 rounded-xl'>
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
      </li>
    </>
  )
}
