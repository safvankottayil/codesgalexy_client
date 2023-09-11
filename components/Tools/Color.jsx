import React from 'react'
import { Sketch } from "@uiw/react-color";
function Color({hex,setHex,show}) {
  return (
    <>
    <div onMouseOver={()=>show(true)} onMouseLeave={()=>show(false)} className='flex fo w-fit h-fit absolute -right-[220px]'>
      <Sketch
        color={hex}
        onChange={(color) => {
          setHex(color.hex);
        }}
      />
    </div>
    </> )
}

export default Color
