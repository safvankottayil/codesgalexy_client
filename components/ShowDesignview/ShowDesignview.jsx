'use client'
import React, { useEffect, useRef, useState } from 'react'
import Editer from '@/components/Editor/Editor'
import UserAxios from '@/Axios/client'
import {Htmlconverter} from '@/components/Html/index'
import { SiHtml5 } from 'react-icons/si'
import { FaCss3Alt } from 'react-icons/fa'
import { BiLogoJavascript,BiSolidMessageAltDetail } from 'react-icons/bi'
import Link from 'next/link'
import DesignLike from '../DesignLike/DesignLike'
import DesignSaved from '../DesignLike/DesignSaved'
import DesignCommont from '../Comment/DesignCommont'
import ShowComment from '../Comment/ShowComment'

// import { XMarkIcon } from '@heroicons/react/24/outline'
function ShowDesignview({id}) {
    const btn=useRef(null)
    const [count,SetCount]=useState(0)
     useEffect(()=>{
     UserAxios.get('/designview?id='+id).then((res)=>{
        if(res.data.status){
          SetHtml(res.data.Design.html)
          Setcss(res.data.Design.css)
          Setjs(res.data.Design.js)
          SetDesign(res.data.Design)
          SetUSer(res.data.Design.UserId)
          setTimeout(() => {
            btn.current.click()
          }, 1);
        }
     })
     },[])
    
    const [Design,SetDesign]=useState({})
    const [User,SetUSer]=useState({})
    const [Cssvalue,Setcss]=useState('')
    const [Htmlvalue,SetHtml]=useState('')
    const [jsvalue,Setjs]=useState('')
    const Htmlcode=Htmlconverter(Htmlvalue,Cssvalue,jsvalue)
    const htmlEditer=<Editer value={Htmlvalue} language={'html'} Mount={SetHtml} />
    const CssEditer=<Editer value={Cssvalue} language={'css'} Mount={Setcss} />
    const JsEditer=<Editer value={jsvalue} language={'javascript'} Mount={Setjs} />
    const [show,setShow]=useState(CssEditer)
          return (
            <>
            <div className='flex w-full flex-col'> 
    <div className='grid md:grid-cols-5  grid-rows w-full  border-2 mt-1 border-black rounded-xl'>
    <div className='bg-black md:col-span-2 border-2 h-[300px] md:h-[600px]  border-gray-200  md:rounded-s-2xl '>
        <div className='h-12 bg-slate-900 rounded-ss-xl'>
            <div className=' flex h-12 items-end'>
                <button ref={btn} onClick={() => setShow(htmlEditer)} className='bg-zinc-700 text-white  hover:bg-slate-500 flex ml-2  rounded-t-md p-1 px-3' > <SiHtml5 className='w-6 h-6 mr-2' /> <span>HTML</span></button>
                <button onClick={() => setShow(CssEditer)} className='bg-zinc-700 text-white hover:bg-slate-500 flex   rounded-t-md p-1 px-3 ml-2' ><FaCss3Alt className='w-6 h-6 ' /> <span>CSS</span></button>
                <button onClick={() => setShow(JsEditer)} className='bg-zinc-700 text-white hover:bg-slate-500 flex   rounded-t-md p-1 px-3 ml-2' ><BiLogoJavascript className=' w-6 h-6 mr-1 ' /> <span className='uppercase'>Javascript</span></button>
            </div>
        </div>
        <div className='h-[92%] pt-2 felx items-center'>
            {show}
        </div>
    </div>
    <div className=' bg-white md:col-span-3 border-2 h-[300px] md:h-[600px] border-gray-200  md:rounded-e-2xl'>
        <div className='h-full'>
            <iframe className='w-full h-full rounded-md' srcDoc={Htmlcode} ></iframe>
        </div>
    </div>
   
</div>

<div className='grid mt-2 grid-cols-12 items-center w-full '>
                                    <div className='flex col-span-1 justify-center '>
                                        <div className='w-14'>
                                            <Link href={'/user/'+User._id}>
                                            {User.image ? <img className='bg-black rounded-full ml-2 mb-2 h-14 w-14' src={User.image} /> :
                                                <div className='bg-black rounded-full ml-2 mb-2 h-14 w-14'></div>
                                            }
                                            </Link>
                                        </div>                                     
                                    </div>
                                    <DesignCommont count={count} Update={SetCount} id={id} />
                                    <div className='flex items-center col-span-2 justify-end mr-2 '>
                                        <span className='flex flex-col items-center mt-[10px] mr-1'>
                                        <BiSolidMessageAltDetail className='w-7 h-7'/>
                                        <span className='text-xs'>12</span>
                                        </span>
                                       
                                        <DesignLike id={id} w={'w-7'} h={'h-8'}  />
                                        <DesignSaved id={id}  w={'w-6 mt-[7px] mx-2 mb-[2px]'} h={'h-6'}  />
                                    </div>
                                     </div>
                                     
                                     <ShowComment counts={count} Comment={Design.comment} Design_id={id} />
                                     </div>

</>
  )
}

export default ShowDesignview
