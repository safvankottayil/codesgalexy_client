import Navbar from '@/components/Navbar/Navbar'
import ShowProfile from '@/components/Profile/ShowProfile';
import ShowUserPosts from '@/components/Profile/ShowUserPosts';
import ShowUserTutorial from '@/components/Profile/ShowUserTutorial';

import React from 'react'

function page({params:{id}}) {
  console.log(id);
return (
  <div>
      <Navbar/>
    <ShowProfile id={id} />
    <ShowUserTutorial id={id} />
  </div>
)
}

export default page
