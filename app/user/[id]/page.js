import Navbar from '@/components/Navbar/Navbar'
import ShowProfile from '@/components/Profile/ShowProfile'
import ShowUserPosts from '@/components/Profile/ShowUserPosts';
import React from 'react'

function page({params:{id}}) {
    console.log(id);
  return (
    <div>
        <Navbar/>
      <ShowProfile id={id} />
      <ShowUserPosts id={id} />
    </div>
  )
}

export default page
