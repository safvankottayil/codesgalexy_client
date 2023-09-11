import React from 'react'
import { LiaHandPointRight } from 'react-icons/lia'

function ShowList({value}) {
    return (
        <div style={{background:value.bg}} className="flex justify-between relative pl-2">
        <div style={{overflowWrap:'break-word',color:value.color,display:'flex'}} className={...value.css}>
        
        <div>
            <LiaHandPointRight className="mr-2 mt-1 w-6 h-6"/></div> <i> {value.data.text}</i>
        </div>
        </div>
      )
  
}

export default ShowList
