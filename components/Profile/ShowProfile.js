
import React from 'react'
import { MdAccountCircle } from "react-icons/md";
import Link from 'next/link';
import {userUrl} from '@/url'
import UserFollow from '../UserfollowAndUnfollw/UserFollow';

async function getData(id){
    const res=await fetch(userUrl+'/user/'+id,{next:{revalidate:10}})
    const Data=await res.json()
    if(Data.status){
        return Data
    }else{
        return false
    }
}
async function ShowProfile({id}) {
    const {User}=await getData(id)
    return (
        <>
            <div className=' flex-col w-full justify-center '>
                <div className='flex flex-col  justify-center'>
                    <div className='flex  w-full xl:ml-12 xl:w-4/6 h-fit '>
                        <div className='pt-3 pl-4  md:pl-28'>
                            { User.image? <img src={User.image} className='rounded-full  w-32 h-32 md:w-48 md:h-48 m-3 border-4 border-emerald-500 ' /> : <MdAccountCircle className='  w-32 h-32 md:w-52 md:h-52 ' />}
                        </div>
                        <div className='flex-col ml-6 '>
                            <div className='pt-9 md:pt-12 flex mb-0 pb-0'>
                                <p className='font-bold md:text-2xl'>{User.name}</p>
                                <UserFollow id={User._id}/>
                            </div>
                          
                            <span className='text-xs font-sans md:text-lg  '>{User.email}</span>
                            <div className='flex md:mt-2'>
                                <div className='bg-slate-200 shadow-sm shadow-black text-xs px-1 rounded-sm mr-2'>
                                    <span className='px-1 font-semibold md:text-lg'>7 Posts</span>
                                </div>
                                <div className='bg-slate-200  shadow-sm shadow-black text-xs px-1 rounded-sm'>
                                    <span className='px-1 pb-1 md:text-lg md:px2 font-semibold'>122 Saved</span>
                                </div>

                            </div>
                          
                    </div>
                </div>
                {/* posts and saved docs */}
                <div className='flex-col  w-full'>
                    <div className='flex justify-center'>
                        <nav className='flex w-full justify-center  xl:w-4/5'>
                            <div className=' items-center bg-slate-50 shadow-sm shadow-slate-400 w-full flex justify-center'>
                                <ul className='flex w-full px-16 md:px-1 md:text-lg text-sm md:w-96 justify-between'>
                                    <Link href={'/user/'+id+'/'} className='px-2 border-b-4 border-b-transparent py-2 hover:border-b-4 hover:border-green-600 uppercase hover:bg-gray-100'>Posts</Link>
                                    <Link href={`/user/${id}/tutorials`} className='px-2 border-b-4 border-b-transparent py-2 hover:border-b-4 hover:border-green-600 uppercase hover:bg-gray-100'> Documents</Link>
                                   
                                </ul>
                            </div>
                        </nav>
                    </div>


                </div>
            </div>
            </div>
        </>
    )
}

export default ShowProfile
