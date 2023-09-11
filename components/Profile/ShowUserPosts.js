import React from 'react'
import Link from 'next/link';
import {userUrl} from '@/url'
import {Htmlconverter} from '@/components/Html/index'
import DesignLike from '../DesignLike/DesignLike';
import DesignSaved from '../DesignLike/DesignSaved';
async function getData(id){
    const res=await fetch(userUrl+'/user/'+id,{next:{revalidate:10}})
    const Data=await res.json()
    if(Data.status){
        return Data
    }else{
        return false
    }
}
async function ShowUserPosts({id}) {
    const {User,Designs}=await getData(id)
    const Design=Designs
  return (
    <div className='w-full flex justify-center mb-2'>
            <div className='w-full xl:w-4/5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 '>
                {Design ? Design.map((Data) => {
                    const HTMLcode=Htmlconverter(Data.html,Data.css,Data.js)
                       console.log(HTMLcode);
                    return (
                        <div className='bg-slate-50 border-2 border-grey-200 '>
                            <div className='h-80  m-2 rounded-md bg-black'>
                                <iframe className='h-80 w-full' srcDoc={HTMLcode} ></iframe>
                            </div>
                            <div className='flex justify-between items-center w-full '>
                                    <div className='flex'>
                                        <div className='w-14'>
                                            {User.image ? <img className='bg-black rounded-full ml-2 mb-2 h-14 w-14' src={User.image} /> :
                                                <div className='bg-black rounded-full ml-2 mb-2 h-14 w-14'></div>
                                            }
                                        </div>
                                        <div className='flex flex-col pl-2 min-w-[100px] '>
                                            <p className='text-lg pl-2 w-[130px] 2xl:max-w-[200px] font-bold capitalize truncate'>{Data.title}</p>
                                            <p className='text-md pl-2 font-semibold capitalize'>{User.name}</p>
                                            {/* <span className='whitespace-nowrap text-xs'>12 likes</span> */}
                                        </div>
                                    </div>
                                    <div className='flex items-center '>
                                        <DesignLike id={Data._id} w={'w-6'} h={'h-7'} Like={true} />
                                        <DesignSaved id={Data._id}  w={'w-5 mt-[7px] mx-2 mb-[2px]'} h={'h-5'} saved={true} />

                                        <Link href={`/view/${Data._id}`} className='bg-black h-8 font-bold text-sm mr-2 rounded-md p-2 text-white'>Show</Link>
                                    </div>
                                </div>
                            </div>
                            // <div className='flex justify-end'>
                                // <Link onClick={()=>SetView(Data)}  href={`/profile/posts/${Data._id}`}  className='bg-black font-bold text-sm mr-2 rounded-md p-2 text-white'>Show</Link>
                            // </div>
                        // </div>
                    )
                }) : ''}




            </div>
        </div>
  )
}

export default ShowUserPosts
