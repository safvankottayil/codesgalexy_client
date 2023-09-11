import React from 'react'
import {BarLoader} from 'react-spinners'
function loading() {
  return (
    <div className='bg-black  h-screen w-full flex items-center justify-center top-0 left-0 absolute' >
      <div className='w-60 animate-spin h-56 rounded-full flex items-center justify-center bg-gradient-to-r from-red-700 to-green-400'>
      <div className='w-52 h-56 rounded-full bg-black'>
</div>
      </div>
    </div>
  )
}

export default loading
