import React from 'react'
import { FaCheck } from 'react-icons/fa'

export default function Select({
  value,
  items,
  onChange,
  Label
}: {
  value: string,
  items: string[],
  onChange: (value: string) => void,
  Label: React.FC<{ children: React.ReactNode }>
}) {
  return (
    <div className='relative group flex items-center border-2 border-black rounded-2xl bg-[#E2F5ED]'>
      <button onBlur={e => {
        e.stopPropagation()
        e.preventDefault()
      }} className='p-3 peer rounded-2xl w-full text-left'>
        <Label>{value}</Label>
      </button>

      {/* TODO: Support tab navigation */}
      <ul tabIndex={0} className={`flex-col max-h-40 overflow-y-auto absolute -top-2 -translate-y-full inset-x-0 bg-neutral-200 rounded-lg border-solid border-2 border-black hidden peer-focus:flex focus:flex group-active:flex`}>
        {items.map((item) => (
          <li
            tabIndex={0}
            role='button'
            key={item}
            className="p-2 flex items-center gap-2 hover:bg-black/10 border-solid border-b border-neutral-400"
            onClick={() => onChange(item)}
          >
            {value === item && (
              <FaCheck className='text-green-700'/>
            )}
            {item || "Select"}
          </li>
        ))}
      </ul>
    </div>
  )
}
