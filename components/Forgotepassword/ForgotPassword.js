'use client'
import React, { useRef, useState } from 'react'
import { FaRegHandPointRight } from 'react-icons/fa'
import UserAxios from '../../Axios/client'
import toast from '../Toast/index'
import { ToastContainer } from 'react-toastify'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
function ForgotPassword() {
    const router=useRouter()
    const SearchParams=useSearchParams()
    const id=SearchParams.get('id')
    if(!id){
    router.push('/')
    }
    const homenavigate=useRef(null)
    const password1 = useRef(null)
    const password2 = useRef(null)
    const password1Err = useRef(null)
    const password2Err = useRef(null)
    function validation(num) {
        let flag = true
        if (num[0] == 1) {
            if (password1.current.value == '') {
                flag = false
                password1Err.current.textContent = 'This field is required'
            } else if (password1.current.value.length < 8) {
                flag = false
                password1Err.current.textContent = 'minimum 8 letters'
            } else {
                password1Err.current.textContent = ''
            }
        }
        if (num[1] == 2) {
            if (password2.current.value != password1.current.value) {
                flag = false
                password2Err.current.textContent = 'This field is required'
            } else {
                password2Err.current.textContent = ''
            }
        }
        return flag
    }
    const [type, Settype] = useState('password')
    function Submit() {
        const check = validation([1, 2])
        if (check) {
            recivevalue()
   async function recivevalue(){
         const res=await UserAxios.patch('/forgotpassword', { password: password1.current.value, id: id })
                if (res.data.status) {
                    // toast({ type: 'success', message: 'Password updated !' })
                   homenavigate.current.click()
                }
        }
        }
    }
    return (
        <>
          <div className=''>
              <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                draggable={false}
                pauseOnVisibilityChange
                closeOnClick
                pauseOnHover>
            </ToastContainer>
          </div>
            <div className='h-screen bg-white w-full'>
           
                <div className='w-full justify-center items-center fixed flex bg-blue-400 h-16'>
                    <span className='text-xl font-bold text-gray-900'>CODESGALEXY</span>
                </div>
                <div className='w-full  min-h-screen flex justify-center items-center'>
                    <div className='w-96 h-fit py-4 flex flex-col rounded-lg items-center border-2 border-black '>
                        <p className='font-bold my-4'>Forgot Password</p>
                        <div className=' w-4/5 my-1 flex items-center '><FaRegHandPointRight className='float-left' /> <span className='text-xs ml-2'>Your password must be at least 8 characters </span></div>
                        <div className=' w-4/5 my-1 flex items-center '><FaRegHandPointRight className='float-left' /> <span className='text-xs ml-2'>Create A Strong Password </span></div>
                        <div className='w-4/5'>
                            <input onChange={() => validation([1, 0])} placeholder='New password' ref={password1} type={type} className='rounded-lg mt-2 text-sm h-10 pl-2 focus:outline-none bg-slate-100 w-full' />

                        </div>
                        <div className='w-4/5 flex'><i ref={password1Err} className={`text-red-600 text-xs errFont `}></i></div>
                        <div className='w-4/5 flex'>
                            <input onChange={() => validation([0, 2])} placeholder='Conform password' ref={password2} type={type} className='text-sm mt-2 rounded-lg h-10 pl-2 focus:outline-none bg-slate-100 w-full' />
                        </div>
                        <div className='w-4/5 h-2 flex '><i ref={password2Err} className={`text-red-600 text-xs errFont  mt-1`}></i></div>

                        <div className='w-4/5 flex items-center pt-3'>
                            <input onClick={(e) => e.target.checked ? Settype('text') : Settype('password')} className='ml-2  w-4 h-4 ' type='checkbox' /><span className='ml-2'>Show password</span>
                        </div>
                        <Link ref={homenavigate} className='hidden' href={'/'}></Link>
                        <div className='w-4/5 flex'>
                            <button onClick={Submit} className='bg-blue-400 mb-6 h-10 w-full rounded-lg mt-2'>Submit</button>
                        </div>
                    </div>


                </div>


            </div>
        </>
    )
}

export default ForgotPassword
