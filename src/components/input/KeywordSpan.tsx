import React from 'react'

type Props = {
  label: string
  handleDelete?: (label: string) => void
}

function KeywordSpan({ label, handleDelete = () => {} }: Props) {
  return (
    <span className='rounded-full border border-gray-400 bg-turquoise p-1 mr-2 mt-2'>
      {label}
      <i
        className='tabler-trash text-[11px] ml-5 cursor-pointer'
        onClick={() => {
          handleDelete(label)
        }}
      />
    </span>
  )
}

export default KeywordSpan
