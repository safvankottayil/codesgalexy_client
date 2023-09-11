'use client'
import './Signup.css'
import React, { useCallback, useRef, useState } from 'react'

import UserAxios from '../../Axios/client'
import toast from '../Toast/index'
import { ToastContainer } from 'react-toastify'
import {LoginShow,SignUpShow} from '@/Redux/client'
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'

function Signup(props) {
    const dispatch=useDispatch()
    const isLogin=useSelector((state)=>state.Client.login)
    const success = useCallback((type, message) => {
        toast({ type, message })
    }, [])
   
    const [successSignup, SetSignupsuccess] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const Erremail = useRef(null), Errname = useRef(null), Errpassword = useRef(null)
    const [nameErr, setnameErr] = useState(0)
    const [emailErr, setEmailerr] = useState(0)
    const [PasswordErr, setpasswordErr] = useState(0)
    const [otpshow, setotpshow] = useState(false)
    const submitForm = (e) => {
        e.preventDefault()
        const data = Validater([1, 2, 3])
        if (data)
            UserAxios.post('/signup', { name, password, email }).then((res) => {
                if(res.data.success){
                success('info', 'Verify  your email')
                SetSignupsuccess(true)
                dispatch(LoginShow(true))
                }else{
                setEmailerr(1)
                Erremail.current.textContent =res.data.msg
                }
            }).catch((err) => {
                console.log(err);
            })
    }
    const Validater = (num) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let flag = true
        if (num[0] == 1) {
            if (name == '') {
                flag = false
                setnameErr(1)
                Errname.current.textContent = 'This field is required'
            } else if (name.length <= 3) {
                flag = false
                setnameErr(1)
                Errname.current.textContent = 'Minimun 4 letters'
            } else {
                flag = true
                setnameErr(2)
                Errname.current.textContent = ''
            }
        }
        if (num[1] == 2) {
            if (email == '') {
                flag = false
                setEmailerr(1)
                Erremail.current.textContent = 'This field is required'
            } else if (!emailRegex.test(email)) {
                flag = false
                setEmailerr(1)
                Erremail.current.textContent = 'Enter email format'
            }
            else {
                setEmailerr(2)
                Erremail.current.textContent = ''
            }
        }
        if (num[2] == 3) {
            if (password == '') {
                flag = false
                setpasswordErr(1)
                Errpassword.current.textContent = 'This field is required'
            } else if (password.length < 8) {
                flag = false
                setpasswordErr(1)
                Errpassword.current.textContent = 'minimum 8 letters'
            } else {
                setpasswordErr(2)
                Errpassword.current.textContent = ''
            }
        }

        return flag
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                draggable={false}
                pauseOnVisibilityChange
                closeOnClick
                pauseOnHover></ToastContainer>
            {successSignup ? '' :
                <div className='flex justify-center h-screen w-screen absolute bg-opacity-40 z-10 bg-black'>

                    <div className='w-96 rounded-lg z-20  bg-white h-fit translate-y-1/4 duration-0 flex-col '>
                        <div className='flex justify-end'><XMarkIcon onClick={() =>dispatch(SignUpShow(false))} opacity={0.3} className='w-7 h-7' /></div>
                        {otpshow == false ? <>
                            <div>
                                <h6 className='mb-8 text-center text-2xl mt-7 font-extrabold text-slate-950 '>Signup</h6>
                            </div>
                            <div>

                                <form onSubmit={submitForm} className=''>
                                    <div className='flex justify-center w-full  ' >
                                        <input onChange={(e) => { setName(e.target.value), Validater([1, 0, 0]) }} className={`rounded-lg h-10 focus:outline-none bg-slate-100 w-4/5  ps-4 ${nameErr == 1 ? 'border-b-2 border-rose-500 ' : nameErr == 0 ? ' border-b-2 border-black ' : 'border-b-2 border-green-500 '}`} type='text' placeholder='Name' de />
                                    </div>
                                    <i ref={Errname} className={`text-red-600 text-sm errFont ms-9 mt-1`}></i>
                                    <div className='flex justify-center w-full  ' >
                                        <input onChange={(e) => { setEmail(e.target.value), Validater([0, 2, 0]) }} className={`rounded-lg h-10 focus:outline-none bg-slate-100 w-4/5  ps-4 ${emailErr == 1 ? 'border-b-2 border-rose-500 ' : emailErr == 0 ? ' border-b-2 border-black ' : 'border-b-2 border-green-500 '}`} type='email' placeholder='Email' de />

                                    </div>
                                    <i ref={Erremail} className={`text-red-600 text-sm errFont ms-9 mt-1`}></i>
                                    <div className='flex justify-center w-full ' >
                                        <input onChange={(e) => { setpassword(e.target.value), Validater([0, 0, 3]) }} className={`rounded-lg h-10 focus:outline-none bg-slate-100 w-4/5  ps-4 ${PasswordErr == 1 ? 'border-b-2 border-rose-500 ' : PasswordErr == 0 ? ' border-b-2 border-black ' : 'border-b-2 border-green-500 '}`} type='password' placeholder='Password' />
                                    </div>
                                    <i ref={Errpassword} className={`text-red-600 text-sm errFont ms-9 mt-1`}></i>

                                    <div className='flex justify-center  w-full'>

                                        {/* <GoogleLogins Signup/> */}
                                    </div>
                                    <div className='flex justify-center mt-4'>
                                        <button className='shadow-sm shadow-black  bg-blue-800 text-white text-lg  w-4/5 h-10 rounded-lg'>Submit</button>
                                    </div>
                                    <div className='flex w-full justify-center pt-4 mb-6'>
                                        <span className='text-sm'> Don’t have an account yet?<Link href={''} className='text-blue-700 hover:underline text-sm font-bold'> Login</Link></span>

                                    </div>


                                </form>


                            </div>
                        </>
                            : ''}
                    </div>
                </div>
            }
        </>
    )
}

export default Signup
