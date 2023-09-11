import React from 'react'
// import OTPInput from 'react-otp-input'
function Otp() {
    console.log(4567);
  return (
    <div className='bg-red-500 w-full flex justify-center py-1 '>
      <div className='flex justify-around w-4/5 ' >
        <input  className='w-10 border-2 border-black rounded-md justify-around h-10'/>
        <input  className='w-10 border-2 border-black rounded-md justify-around h-10'/>
        <input  className='w-10 border-2 border-black rounded-md justify-around h-10'/>
        <input  className='w-10 border-2 border-black rounded-md justify-around h-10'/>
        <input  className='w-10 border-2 border-black rounded-md justify-around h-10'/>
        <input  className='w-10 border-2 border-black rounded-md justify-around h-10'/>
      </div>
      <a href='http://localhost:3000?id=verify'>verify</a>
    </div>
  
  )
}

export default Otp
