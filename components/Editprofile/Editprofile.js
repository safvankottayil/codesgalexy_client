'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import UserAxios from '../../Axios/client'
import { useDispatch, useSelector } from 'react-redux'
import { Setimage } from '@/Redux/client'
import toast from '../Toast/index'
import Cookies from 'js-cookie'
import { redirect } from 'next/dist/server/api-utils'
function Editprofile({ update }) {
 
  const {Image} = useSelector((state) => state.Client)
  const token=Cookies.get('token')
  useEffect(()=>{
   UserAxios.get('/editprofile',{headers:{Authorization:token}}).then((res)=>{
    if(res.data.status){
      console.log(res.data);
      name.current.value=res.data.User.name??''
      userName.current.value=res.data.User.username??''
    }else{
     redirect('/profile')
    }
   })
  },[])
  

  const success=useCallback((type,message)=>{
    toast({type,message})
  },[])
  const dispatch=useDispatch()
  const imagBtn = useRef(null)
  const [imgpreview,Setimages]=useState('')
  const [img,setImg]=useState('')
  // validation states and ref
  const name= useRef(null)
  const userName=useRef(null)
  const password1=useRef(null)
  const password2=useRef(null)
  const Errname = useRef(null), Errpassword1 = useRef(null), Errpassword2 = useRef(null), Errusername = useRef(null)
  const [nameErr, setNameerr] = useState(0)
  const [usernameErr, setUsernameerr] = useState(0)
  const [PasswordErr1, setpassword1Err] = useState(0)
  const [PasswordErr2, setpassword2Err] = useState(0)
  
  const IMagePreview=(img)=>{
    const reader=new FileReader()
    reader.readAsDataURL(img)
    reader.addEventListener('load',()=>{
    const data= reader.result
    console.log(data,45678);
     setImg(data)
    })
  }
  imgpreview ? IMagePreview(imgpreview) :""
  const submitForm = (e) => {
    e.preventDefault()
    const check = Validater([1, 2, 3, 4])
    console.log(check);
    if (check) {
      UserAxios.patch('/editprofile', {
         name:name.current.value, 
         userName:userName.current.value,
         password1:password1.current.value,
         password2:password2.current.value,
         image:img?img:Image },{
          headers:{Authorization:token}
         }).then((res) => {
              if(res.data.status){
                console.log(res.data);
                dispatch(Setimage({image:img?img:Image}))
               success('success','Edit successfully finished')
               update(false)
              }
              else{
                setpassword1Err(1)
                Errpassword1.current.textContent = res.data.msg
              }
      })
    }
  }
  const Validater = (num) => {

    let flag = true
    if (num[0] == 1) {
      if (name.current.value == '') {
        flag = false
        setNameerr(1)
        Errname.current.textContent = 'This field is required'
      } else if (name.current.value.length < 4) {
        flag = false
        setNameerr(1)
        Errname.current.textContent = 'Enter minimum 4 letter'
      }
      else {
        setNameerr(2)
        Errname.current.textContent = ''
      }
    }
    if (num[1] == 2) {
      if (userName.current.value == '') {
        flag = false
        setUsernameerr(1)
        Errusername.current.textContent = 'This field is required'
      } else if (userName.current.value.length < 4) {
        flag = false
        setUsernameerr(1)
        Errusername.current.textContent = 'Enter minimum 4 letter'
      } else {
        setUsernameerr(2)
        Errusername.current.textContent = ''
      }
    }
    if (num[2] == 3) {
      if (password1.current.value == '') {
        flag = false
        setpassword1Err(1)
        Errpassword1.current.textContent = 'This field is required'
      } else if (password1.current.value.length < 8) {
        flag = false
        setpassword1Err(1)
        Errpassword1.current.textContent = 'Enter minimum 8 letter'
      } else {
        setpassword1Err(2)
        Errpassword1.current.textContent = ''
      }
    }
    if (num[3] == 4) {
      
      if (password2.current.value == '') {
        flag = false
        setpassword2Err(1)
        Errpassword2.current.textContent = 'This field is required'
      } else if (password2.current.value.length < 8) {
        flag = false
        setpassword2Err(1)
        Errpassword2.current.textContent = 'Enter minimum 8 letter'
      } else {
        setpassword2Err(2)
        Errpassword2.current.textContent = ''
      }
    }
    return flag
  }

  return (
    <>
    <div className='h-screen w-screen flex justify-center  bg-opacity-40 bg-black z-10 absolute top-0 left-0 '>
      <div className='bg-slate-50 absolute  rounded-lg w-fit translate-y-1/4 ease-in-out duration-300 '>
        <div className='flex justify-end'><XMarkIcon onClick={() => update(false)} className='w-7 h-7' /></div>
        <div className=''><h3 className='font-bold pl-3 '>Edit profile</h3></div>
        <form onSubmit={submitForm} className=' bg-white flex justify-center rounded-lg' >

          <div>
            <div className='flex mt-3'>
              <img src={img?img:Image} className='bg-black rounded-full w-20 h-20 ml-4' alt="" />
              <input onChange={(e)=>Setimages(e.target.files[0])} className='hidden' ref={imagBtn} type="file" />
              <div className='felx flex-col pt-4'>
                <p className='p-0 pl-2 m-0 font-semibold'>safvan</p>
                <span onClick={() => imagBtn.current.click()} className='text-blue-700 pl-2 hover:underline pr-20' >
                  Change profile photo</span>
              </div>
            </div>
            <div className='mt-2 flex flex-col items-center'>
              {/* <label htmlFor="">Username</label> */}
              <input onChange={(e) => { Validater([1, 0, 0, 0])}} ref={name} defaultValue={'Name'} className={`bg-slate-200 focus:outline-none  w-5/6 text-sm pl-2  rounded-md h-9 mt-2 ${nameErr == 1 ? 'border-b-2 border-rose-500 ' : nameErr == 0 ? ' border-b-2 border-black ' : 'border-b-2 border-green-500 '}`} type="text" />

            </div>
            <div className='flex justify-center'><i ref={Errname} className='text-sm text-red-600 w-4/5 h-2 mb-1'></i></div>

            <div className='flex flex-col items-center'>
              {/* <label htmlFor="">Fullname</label> */}
              <input onChange={(e) => { Validater([0, 2, 0, 0]) }} ref={userName} defaultValue={'username'} className={`bg-slate-200  focus:outline-none  w-5/6 text-sm pl-2 rounded-md h-9 mt-2 ${usernameErr == 1 ? 'border-b-2 border-rose-500 ' : usernameErr == 0 ? ' border-b-2 border-black ' : 'border-b-2 border-green-500 '}`} type="text" />
            </div>
            <div className='flex justify-center'><i ref={Errusername} className='text-sm text-red-600 w-4/5 h-2 mb-1'></i></div>
            <div className='flex flex-col items-center'>
              {/* <label htmlFor="">Username</label> */}
              <input onChange={(e) => { Validater([0, 0, 3, 0])}} ref={password1} placeholder='Old password' className={`bg-slate-200 focus:outline-none  w-5/6 text-sm pl-2  rounded-md h-9 mt-2 ${PasswordErr1 == 1 ? 'border-b-2 border-rose-500 ' : PasswordErr1 == 0 ? ' border-b-2 border-black ' : 'border-b-2 border-green-500 '}`} type="password" />
            </div>
            <div className='flex justify-center'><i ref={Errpassword1} className='text-sm text-red-600 w-4/5 h-2 mb-1'></i></div>
            <div className='flex flex-col items-center'>
              {/* <label htmlFor="">Phone number</label> */}
              <input onChange={(e) => { Validater([0, 0, 0, 4]) }} ref={password2} placeholder='New password' className={`bg-slate-200 focus:outline-none   w-5/6 text-sm pl-2 rounded-md h-9 mt-2 ${PasswordErr2 == 1 ? 'border-b-2 border-rose-500 ' : PasswordErr2 == 0 ? ' border-b-2 border-black ' : 'border-b-2 border-green-500 '}`} type="password" />
            </div>
            <div className='flex justify-center'><i ref={Errpassword2} className='text-sm text-red-600 w-4/5 h-2 mb-1'></i></div>

            <div className='flex justify-center'>
              <button className='bg-blue-600 w-5/6 rounded-lg h-9  mt-3 mb-5 text-white font-semibold ' >Submit</button>
            </div>
          </div>
        </form>

      </div>
    </div>
    </>
  )
}

export default Editprofile
