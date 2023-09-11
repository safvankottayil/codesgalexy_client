import React from 'react'
import './404.css'
import Link from 'next/link'
function Error() {
  return (
    <div className='main grid grid-cols-2'>
      <div className='images animate-spin ' >
        <img className='img-1' src="/Screenshot 2023-08-18 210414 1.png" alt="" />
        <img className='img-2' src="/Screenshot 2023-08-18 210414 1.png" alt="" />
        <img className='img-3' src="/Screenshot 2023-08-18 210414 1.png" alt="" />
        <img className='img-4' src="/Screenshot 2023-08-18 210414 1.png" alt="" />
        <img className='img-3' src="/Screenshot 2023-08-18 210414 1.png" alt="" />
        {/* <img className='img-5' src="/Screenshot 2023-08-18 210414 1.png" alt="" /> */}
      </div>

<div class="message-box">
  <h1 >404</h1>
  <p>Page not found</p>
  <div class="buttons-con">
    <div class="action-link-wrap">
      <Link className='homebtn' href={'/'}>Go back</Link>
    </div>
  </div>
</div>
    </div>
  )
}

export default Error
