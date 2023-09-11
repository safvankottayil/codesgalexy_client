import React from 'react'
import Navbar from '@/components/Navbar/Navbar'
import UserDesignview from '@/components/UserDesignview/UserDesignview'
function page({params:{id}}) {
  return (
    <div>
    <Navbar/>
    <UserDesignview/>
</div>
  )
}

export default page
