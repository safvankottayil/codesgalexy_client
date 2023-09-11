'use client'
import React, {useRef, useState } from 'react'
import { SiHtml5 } from 'react-icons/si'
import { FaCss3Alt } from 'react-icons/fa'
import { BiLogoJavascript } from 'react-icons/bi'
import { XMarkIcon } from '@heroicons/react/24/outline'
import userAxios from '../../Axios/client'
import toast from '../Toast/index'
import DesignRemove from '../DesignLike/DesignRemove'
import {Suggution} from '../Suggestion/index'
import Editors from '../Editor/Editor'
import {Htmlconverter} from '../Html/index'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
function UserDesignview() {
    const router=useRouter()
    const {html,css,js,Design_id}=useSelector((state)=>state.Client)
    const [jsvalue, jsmount] = useState(js)
    const [Htmlvalue, Htmlmount] = useState(html)
    const [Cssvalue, Cssmount] = useState(css)
    const HtmlCode=Htmlconverter(Htmlvalue,Cssvalue,jsvalue)
    const HtmlEditor=<Editors value={Htmlvalue} language={'html'} Mount={Htmlmount} />
    const CssEditor=<Editors value={Cssvalue} language={'css'} Mount={Cssmount}/>
    const JsEditor=<Editors value={jsvalue} language={'javascript'} Mount={jsmount}/>
    const [show,SetShow]=useState(HtmlEditor)
    async function update(){
    const res=await userAxios.patch('/profile/posts/viewUpdate',{Design_id,html:Htmlvalue,css:Cssvalue,js:jsvalue})
     if(res.data.status){
        toast({type:"success",message:"Successfully updated"})
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
    }
  return (
    <div className='grid md:grid-cols-2 md:h-[600px] grid-rows  px-2 pt-1 rounded-xl'>
    <div className='bg-black border-2 h-[300px] md:h-[580px]  border-gray-200  md:rounded-s-2xl '>
        <div className='h-12 bg-slate-900 rounded-ss-xl'>
            <div className=' flex h-12 items-end'>
                <button onClick={() => SetShow(HtmlEditor)} className='bg-zinc-700 text-white  hover:bg-slate-500 flex ml-2  rounded-t-md p-1 px-3' > <SiHtml5 className='w-6 h-6 mr-2' /> <span>HTML</span></button>
                <button onClick={() => SetShow(CssEditor)} className='bg-zinc-700 text-white hover:bg-slate-500 flex   rounded-t-md p-1 px-3 ml-2' ><FaCss3Alt className='w-6 h-6 ' /> <span>CSS</span></button>
                <button onClick={() => SetShow(JsEditor)} className='bg-zinc-700 text-white hover:bg-slate-500 flex   rounded-t-md p-1 px-3 ml-2' ><BiLogoJavascript className=' w-6 h-6 mr-1 ' /> <span className='uppercase'>Javascript</span></button>
            </div>
        </div>
        <div className='h-[92%] pt-2 felx items-center'>
            {show}
        </div>
    </div>
    <div className=' bg-white border-2 h-[300px] md:h-[580px] border-gray-200  md:rounded-e-2xl'>
        <div className='h-full'>
            <iframe className='w-full h-full' srcDoc={HtmlCode} ></iframe>
        </div>
    </div>
    <div className='md:col-span-2 h-16  rounded-md mt-1  bg-emerald-800'>
        <div className='flex items-center h-16 justify-end'>
            <DesignRemove id={Design_id}/>
            <button onClick={update} className=' p-2 ml-2 bg-black rounded-md font-semibold text-white mr-8'>Update</button>
        </div>

    </div>
</div>
  )
}

export default UserDesignview
