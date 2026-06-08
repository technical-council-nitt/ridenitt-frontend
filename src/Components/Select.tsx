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
  const [isOpen, setIsOpen] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div ref={menuRef} className='relative flex items-center border-2 border-black rounded-2xl bg-[#E2F5ED]'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='p-3 rounded-2xl w-full text-left focus:outline-none'
      >
        <Label>{value}</Label>
      </button>

      {isOpen && (
      <ul className={`flex-col max-h-40 overflow-y-auto absolute -top-2 -translate-y-full inset-x-0 bg-neutral-200 rounded-lg border-solid border-2 border-black z-50`}>
        {items.map((item) => (
          <li
            role='button'
            key={item}
            className="p-2 flex items-center gap-2 hover:bg-black/10 active:bg-black/20 border-solid border-b border-neutral-400 cursor-pointer"
            onClick={() => {
              onChange(item)
              setIsOpen(false)
            }}
          >
            {value === item && (
              <FaCheck className='text-green-700'/>
            )}
            {item || "Select"}
          </li>
        ))}
      </ul>
      )}
    </div>
  )
}
