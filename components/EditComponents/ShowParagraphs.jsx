import React from 'react'

function ShowParagraphs({value}) {
  return (
    <div style={{background:value.bg}} className="flex justify-between relative">
    <p style={{overflowWrap:'break-word',color:value.color,textIndent:30}} className={...value.css}>
    {value.data.P}
    </p>
    </div>
  )
}

export default ShowParagraphs
