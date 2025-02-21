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
    <div className='relative dropdown dropdown-top flex items-center border-2 border-black rounded-2xl bg-[#E2F5ED]'>
      <div tabIndex={0} role='button' className='p-3 peer rounded-2xl w-full text-left'>
        <Label>{value}</Label>
      </div>

      {/* TODO: Support tab navigation */}
      <ul tabIndex={0} className={`dropdown-content flex-col max-h-40 w-full overflow-y-auto bg-neutral-200 rounded-lg border-solid border-2 border-black flex`}>
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
