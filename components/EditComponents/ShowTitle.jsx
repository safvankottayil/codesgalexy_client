import React from 'react'

function ShowTitle({value}) {
  
  return (
    <div style={{ backgroundColor: value.bg }} className="flex justify-between">
        <h6 style={{ color: value.color }} className={...value.css}>
          {value.data.text}
        </h6>
   </div>
  )
}

export default ShowTitle
