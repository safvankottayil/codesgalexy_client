import React from 'react'
import ShowAlldesigns from '@/components/ShowAlldesigns/ShowAlldesigns'
import Navbar from '@/components/Navbar/Navbar'
import ShowDesignview from '@/components/ShowDesignview/ShowDesignview';
async function page({params:{id}}) {

  return (
    <div>
      <Navbar/>
      <div className='flex'>
      <ShowAlldesigns />
      <div className='flex w-full'>
       <ShowDesignview id={id} />
      </div>
      </div>
    </div>
  )
}

export default page
