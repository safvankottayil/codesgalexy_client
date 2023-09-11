'use client'
import './Addesign.css'
import React, { useEffect, useRef, useState } from 'react'
import { SiHtml5 } from 'react-icons/si'
import { FaCss3Alt } from 'react-icons/fa'
import { BiLogoJavascript } from 'react-icons/bi'
import { XMarkIcon } from '@heroicons/react/24/outline'
import userAxios from '@/Axios/client'
import { Suggution,DesignCategorySuggution } from '../Suggestion/index'
import Editors from '../Editor/Editor'
import { Htmlconverter } from '../Html/index'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import toast from '../Toast/index'

function addDesign() {
    const router=useRouter()
    const Token=Cookies.get('token')
    useEffect(()=>{
      userAxios.get('/isSaveDesign',{headers:{Authorization:Token}}).then((res)=>{
        if(res.data.status){
            router.push(`/add-design/${res.data.Design._id}`)
        }else{
            if(res.data.type=='err'){
                router.push('/404')
            }else if(res.data.type=='user'){
               router.push('/')
            }else if(res.data.type=='block'){
                Cookies.remove('token')
                router.push('/')
            }
        }
      })
    },[])
   
    const [jsvalue, jsmount] = useState(`const card = document.getElementById("demo")
    card.addEventListener("mouseover", () => {
        card.setAttribute("style", "background-color:#fff;")
    })`)
    const [Htmlvalue, Htmlmount] = useState('<div id="demo" class="main"></div>')
    const [Cssvalue, Cssmount] = useState(`body{
    display: flex;
    align-items: center;
    justify-content: center;
}
.main{
    height: 40%;
    width: 30%;
    background-color: rgb(163, 165, 165);
    border-radius: 8px;
}`)

    //Html code
    const title=useRef(null)
    const category=useRef(null)
    const titleErr=useRef(null)
    const categoryErr=useRef(null)
    const HTMLcode = Htmlconverter(Htmlvalue, Cssvalue, jsvalue)
    const HtmlEditor = <Editors Mount={Htmlmount} language={'html'} value={Htmlvalue} />
    const CssEditor = <Editors Mount={Cssmount} language={'css'} value={Cssvalue} />
    const jsEditor = <Editors Mount={jsmount} language={'javascript'} value={jsvalue} />
    const [show, setShow] = useState(HtmlEditor)
    const [submitbtn, setsubmitbtn] = useState(false)
    const [tage, setTages] = useState('')
    const [tages, SetTagecollection] = useState([])
    const [suggetion, SetSuggetions] = useState([])
    const [categorys,SetCategorys]=useState([])
    const [categoryname,SetcategoryName]=useState('')
    const tagevalue = useRef(null)
    function validation(num){
        let flag=true
        if(num[0]==1){
            if(title.current.value==''){
              flag=false
              titleErr.current.textContent = 'This field is required'
            }else if(title.current.value.length<4){
                flag=false
                titleErr.current.textContent='Minimum 4 letter'
            }else{
                titleErr.current.textContent=''
            }
        }
        if(num[1]==2){
          
            if(category.current.value==''){
              flag=false
              categoryErr.current.textContent = 'This field is required'
            }else if(category.current.value.length<4){
                flag=false
                categoryErr.current.textContent='Minimum 4 letter'
            }else{
                categoryErr.current.textContent=''
            }
        }
        return flag
    }


    const Tagefuntion = (e) => {
        setTages(e.target.value)
        let Tage = tagevalue.current.value
        Tage = Tage.toLowerCase()
        const space = /\s+/
        let istage = false
        if (space.test(Tage[0])) {
            Tage = ''
            setTages('')
        }
        if(Tage!=''){
            Suggution(Tage, SetSuggetions)
        }else{
            SetSuggetions([])
        }
        for (let i = 0; i < Tage.length; i++) {
            let char = Tage[i]
            if (space.test(char)) {
                istage = true
            }
        }
        if (istage) {
            SetTagecollection([...tages, Tage])
            setTages('')
            SetSuggetions([])
        }
    }
    function Submit() {
        if (!tages.length < 3) {
          const check=validation([1,2])
          if(check){
            userAxios.post('/add-design', { Htmlvalue, jsvalue, Cssvalue, tages,title:title.current.value,category:category.current.value.toLowerCase()},{headers:{Authorization:Token}}).then((res) => {
                if (res.data.status) {
                    toast({ type: "success", message: 'Successfully added' })
                    setsubmitbtn(false)
                }
            })
        }
    }
    
    }
    function Save(){
     
        userAxios.post('/saveDesign',{Htmlvalue,jsvalue, Cssvalue},{headers:{Authorization:Token}}).then((res)=>{
            if(res.data.status){
            router.push('/add-design/'+res.data.Design_id)
            }
        })
    }
    return (
        <>
            {submitbtn ? <div className='top-1 left-0 flex justify-center absolute h-screen w-full z-10 bg-black bg-opacity-50'>
                <div className=' w-[400px] translate-y-10 rounded-md h-fit p-2 bg-white'>
                    <div className='flex justify-end'><XMarkIcon onClick={() => setsubmitbtn(false)} opacity={0.3} className='w-7 h-7' /></div>
                    <iframe srcDoc={HTMLcode} className='class  rounded-md w-full h-[300px]'></iframe>
                    <div className='flex flex-col'>
                        <label htmlFor="" className='font-semibold'>Title</label>
                        <input onChange={()=>{validation([1,0])}} ref={title} type="text" placeholder='Title' className='w-full bg-slate-200 focus:outline-none pl-3 h-10 rounded-md ' />
                    </div>
                    <div className='w-4/5 h-2 flex '><i ref={titleErr} className={`text-red-600 text-sm errFont mb-1`}></i></div>
                    <div className='flex flex-col mt-2 relative'>
                        <label htmlFor="" className='font-semibold '>Category</label>
                        <input onChange={(e)=>{
                            SetcategoryName(e.target.value)
                            validation([0,2])
                            DesignCategorySuggution(category.current.value,SetCategorys)
                            }} ref={category} type="text"  value={categoryname}  placeholder='eg:-buttons,cards,navbar' className='w-full focus:outline-none bg-slate-200 pl-3 h-10 rounded-md ' />
                        <div className=' w-60 flex flex-col top-16  absolute'>
                            {categorys.map((item)=>{
                                return(
                                    <p key={item._id} onClick={()=>{
                                    SetcategoryName(item.category)
                                    SetCategorys([])
                                    validation([0,2])
                                    }} className='w-full h-6 pl-2 z-10 border-[0.5px] text-sm font-semibold bg-slate-300'>{item.category}</p>
                                )
                            })}
                        </div>
                    </div>
                    <div className='w-4/5 h-2 flex mb-2 '><i ref={categoryErr} className={`text-red-600 text-sm errFont`}></i></div>
                    <label className='text-sm font-semibold  my-2'>Add tags</label>
                    <div className='relative'>
                        <div className='bg-slate-200 relative w-380px rounded-md overflow-x-hidden h-10 px-2 flex items-center'>
                            {tages.map((value) => {
                               
                                return (
                                    <span key={value} className='bg-gray-300 pl-2 rounded-md flex mr-1 '><span>{value} </span><XMarkIcon onClick={() => {
                                        SetTagecollection(tages.filter((data) => {
                                            return data != value
                                        }))
                                    }} className='pt-1 w-5 h-5' /></span>
                                )
                            })}
                            <input placeholder='' ref={tagevalue} onChange={Tagefuntion} value={tage} className='bg-transparent focus:outline-none' />

                        </div>
                        <div style={{ height: '100px' }} className='absolute overflow-hidden flex  flex-col top-10'>
                            {suggetion.map((data) => {
                                if (!tages.includes(data.Tage)) {
                                    return (
                                        <p key={data._id} onClick={() => { setTages(''), SetTagecollection([...tages, data.Tage]), SetSuggetions([]) }} style={{ width: '300px' }} className='bg-gray-100 pl-2 shadow-amber-200 shadow-sm '>{data.Tage}</p>
                                    )
                                }
                            })}

                        </div>
                        <span className='text-sm text-gray-400 pt-1 '>Add atleast 3 more tags to continue.</span>
                        <div className='flex justify-end mt-10'>
                            <button onClick={Submit} className={`${tages.length < 3 ? 'bg-blue-300' : 'bg-blue-500'} rounded-md px-2 py-1 text-white font-bold `}>Next</button>
                        </div>
                    </div>
                </div>
            </div> : ''}
            <div className='grid md:grid-cols-2 md:h-[600px] grid-rows  px-2 pt-1 rounded-xl'>
                <div className='bg-black border-2 h-[300px] md:h-[580px]  border-gray-200  md:rounded-s-2xl '>
                    <div className='h-12 bg-slate-900 rounded-ss-xl'>
                        <div className=' flex h-12 items-end'>
                            <button onClick={() => setShow(HtmlEditor)} className='bg-zinc-700 text-white  hover:bg-slate-500 flex ml-2  rounded-t-md p-1 px-3' > <SiHtml5 className='w-6 h-6 mr-2' /> <span>HTML</span></button>
                            <button onClick={() => setShow(CssEditor)} className='bg-zinc-700 text-white hover:bg-slate-500 flex   rounded-t-md p-1 px-3 ml-2' ><FaCss3Alt className='w-6 h-6 ' /> <span>CSS</span></button>
                            <button onClick={() => setShow(jsEditor)} className='bg-zinc-700 text-white hover:bg-slate-500 flex   rounded-t-md p-1 px-3 ml-2' ><BiLogoJavascript className=' w-6 h-6 mr-1 ' /> <span className='uppercase'>Javascript</span></button>
                        </div>
                    </div>
                    <div className='h-[91%] pt-2 felx items-center'>
                        {show}
                    </div>
                </div>
                <div className=' bg-white border-2 h-[300px] md:h-[580px] border-gray-200  md:rounded-e-2xl'>
                    <div className='h-full'>
                        <iframe className='w-full h-full' srcDoc={HTMLcode} ></iframe>
                    </div>
                </div>
                <div className='md:col-span-2 h-16  rounded-md mt-1  bg-emerald-700'>
                    <div className='flex items-center h-16 justify-end'>
                        <button onClick={()=>Save()} className='p-2 bg-emerald-950 mr-2 rounded-md text-white'>Save</button>
                        <button onClick={() => setsubmitbtn(true)} className=' p-2 bg-black rounded-md font-semibold text-white mr-8'>Submit</button>
                    </div>

                </div>
            </div>


        </>
    )
}
export default addDesign
