import React from 'react'

function ShowParagraphs({value}) {
  return (
    <div style={{background:value.bg}} className="flex justify-between relative">
    <p style={{overflowWrap:'break-word',color:value.color,textIndent:30}} className={...value.css}>
    <p className='text-sm md:text-lg'>{value.data.P}</p>
    </p>
    </div>
  )
}

export default ShowParagraphs
