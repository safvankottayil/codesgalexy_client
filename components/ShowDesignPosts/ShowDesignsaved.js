'use client'
import React, { useEffect, useState } from 'react'
import UserAxios from '../../Axios/client'
import { useDispatch, useSelector } from 'react-redux'
import {Htmlconverter} from '../Html/index'
import {SetDesignView} from '../../Redux/client'
import Cookies from 'js-cookie'
import Link from 'next/link'
import DesignLike from '@/components/DesignLike/DesignLike'
import DesignSaved from '@/components/DesignLike/DesignSaved'
import { useRouter } from 'next/navigation'
import Loader from 'react-spinners/MoonLoader'
function ShowDesignsaved() {
    const router=useRouter()
    const [isLoader,setLoader]=useState(false)
    const dispatch=useDispatch()
    const token=Cookies.get('token')
    const [Design,SetDesign]=useState([])
        useEffect(() => {
            setLoader(true)
            UserAxios.get('/profile/saved',{headers:{Authorization:token}}).then((res) => {
                if (res.data.status) {
                    SetDesign(res.data.Designs)
                    setLoader(false)
                } else {
                    if (res.data.type == "block") {
                      Cookies.remove("token");
                      router.push("/?login="+true);
                    } else if (res.data.type == "err") {
                      router.push("/404");
                    } else if (res.data.type == "user") {
                      router.push("/?login="+true);
                    }
                  }
            })
        }, [])
    
    function SetView(data){
   dispatch(SetDesignView({html:data.html,css:data.css,js:data.js,id:data._id}))
    }
    return (
        <div className='w-full mt-5 gap-3 flex justify-center mb-2'>
               
        {
        isLoader?
       <div className="flex flex-grow justify-center pt-20">    <Loader/></div>
     
      
     :
            <div className='w-full xl:w-4/5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 '>
                {Design ? Design.map((Data) => {
                    const HTMLcode=Htmlconverter(Data.design.html,Data.design.css,Data.design.js)
                       console.log(HTMLcode);
                    return (
                        <div key={Data._id} className='bg-slate-50 border-2 border-grey-200 '>
                            <div className='h-80  m-2 rounded-md bg-black'>
                                <iframe className='h-80 w-full' srcDoc={HTMLcode} ></iframe>
                            </div>
                            <div className='flex justify-between items-center w-full '>
                                    <div className='flex'>
                                        <div className='w-14'>
                                            {Data.design.UserId.image ? <img className='bg-black rounded-full ml-2 mb-2 h-14 w-14' src={Data.design.UserId.image} /> :
                                                <div className='bg-black rounded-full ml-2 mb-2 h-14 w-14'></div>
                                            }
                                        </div>
                                        <div className='flex flex-col pl-2 min-w-[100px] '>
                                            <p className='text-lg pl-2 w-[130px] 2xl:max-w-[200px] font-bold capitalize truncate'>{Data.design.title}</p>
                                            <p className='text-md pl-2 font-semibold capitalize'>{Data.design.UserId.name}</p>
                                            {/* <span className='whitespace-nowrap text-xs'>12 likes</span> */}
                                        </div>
                                    </div>
                                    <div className='flex items-center '>
                                        <DesignLike id={Data.design._id} w={'w-6'} h={'h-7'} Like={true} />
                                        <DesignSaved id={Data.design._id}  w={'w-5 mt-[7px] mx-2 mb-[2px]'} h={'h-5'} saved={true} />

                                        <Link onClick={()=>SetView(Data.design)}  href={`/profile/posts/${Data.design._id}`} className='bg-black h-8 font-bold text-sm mr-2 rounded-md p-2 text-white'>Show</Link>
                                    </div>
                                </div>
                            </div>
                          
                    )
                }) : ''}




            </div>}
        </div>
    )
}

export default ShowDesignsaved
