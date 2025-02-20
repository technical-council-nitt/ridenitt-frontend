import { useEffect, useRef } from "react"

export default function Prompt({
  label,
  onConfirm,
  onCancel
}: {
  label: string
  onConfirm: (value: string) => void
  onCancel: () => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div onClick={() => onCancel()} className="fixed p-4 grid place-items-center inset-0 z-[100] bg-black/25">
      <div onClick={e => e.stopPropagation()} className="w-full bg-white p-4 rounded-lg shadow-lg">
        <p>{label}</p>

        <input placeholder="Type here" ref={inputRef} className="w-full mt-4 p-2 border border-solid border-black rounded-md" />

        <div className="mt-4 w-fit ml-auto flex items-center gap-2">
          <button className="text-green-700 px-4 py-2 rounded-md" onClick={onCancel}>
            Cancel
          </button>

          <button
            className="bg-green-700 text-white px-4 py-2 rounded-md"
            onClick={() => {
              onConfirm(inputRef.current?.value || "")
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}
