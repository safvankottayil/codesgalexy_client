'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { MdAccountCircle } from "react-icons/md";
import toast from '../Toast/index'
import { ToastContainer } from 'react-toastify'
import Link from 'next/link'
import Login from '../Login.js/Login'
import Signup from '../Signup/Signup'
import UserAxios from '../../Axios/client'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { useSelector, useDispatch } from 'react-redux'
import { Setimage, UserLogout, SetUserId,LoginShow,SignUpShow } from '../../Redux/client'
const navigation = [
    { name: 'Home', href: '/', current: true },
    { name: 'Learn', href: '/learn', current: false },
    { name: 'Create', href: '/add-design', current: false },
    { name: 'Designs', href: '/designs', current: false },
    { name: 'Community', href: '/community', current: false },
    { name: 'Chats', href: '/chat', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function Navbar() {
    const token=Cookies.get('token')
    const router=useRouter()
    const SearchParams = useSearchParams()
    const id = SearchParams.get('id')
    const login =SearchParams.get('login')
   useEffect(()=>{
    if(login){
        if(token){

        }else{
            dispatch(LoginShow(true))
        }
      
    }
   },[])
   
    const Token= Cookies.get('token') 
    const dispatch = useDispatch()
    const loginbtn = useRef(null)
    useEffect(() => {
        if (id) {
            UserAxios.patch('/verify', { id }).then((res) => {
                if (res.data.success) {
                    Success('success', 'Email verifyed')
                }else{
                    router.push('/404')
                }
            })
            if (loginbtn.current)
                loginbtn.current.click()
        }

    }, [])
    const Success = useCallback((type, message) => {
        toast({ type, message })
    })
    const showLogin=useSelector((state)=>state.Client.login)
        
        const showSignup=useSelector((state)=>state.Client.signup)
  
    const logout = () => {
        Cookies.remove('token')
        dispatch(UserLogout())
        dispatch(Setimage({ image: '' }))
        dispatch(SetUserId({ UserId: '' }))
        Success('success', 'successfully Logout')
        router.push('/')
    }
    return (
        <div>
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
            {showLogin ? <Login  value={showLogin}  /> : ''}
            {showSignup ? <Signup  value={showSignup}  /> : ''}
            <div className=' h-16'>
                <Disclosure as="div" className="w-full fixed z-30 bg-emerald-800">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8  ">
                                <div className="relative flex h-16 items-center justify-between">
                                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                        {/* Mobile menu button*/}
                                        <Disclosure.Button  className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                        <div className="flex items-center flex-shrink-0  ">
                                            <img
                                            className="w-10  h-10 "
                                            src='/logo-icon.png'
                                            alt="Your Company"
                                        />
                                        <p className='text-white text-3xl -mt-1 font-sans font-bold'>Codesgalaxy</p>
                                        </div>
                                        <div className="hidden pl-5 sm:ml-6 sm:flex">
                                            <div className="flex items-center space-x-4">
                                                {navigation.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        href={item.href}
                                                        className={classNames(
                                                            item.current ? ' text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                            'rounded-md px-3 py-2 text-sm font-medium'
                                                        )}
                                                        aria-current={item.current ? 'page' : undefined}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    {Token ?
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                            {/* <button
                                            type="button"
                                            className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                        >
                                            {/* <span className="sr-only">View notifications</span>
                                            <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
                                            {/* </button> */}

                                            {/* Profile dropdown */}
                                            <Menu as="div" className="relative ml-3">
                                                <div>
                                                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                        <span className="sr-only">Open user menu</span>

                                                        <MdAccountCircle className="h-8 w-8 bg-white rounded-full" />
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link
                                                                    href="/profile/posts"
                                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                                >
                                                                    Your Profile
                                                                </Link>
                                                            )}
                                                        </Menu.Item>

                                                        <Menu.Item >
                                                            {({ active }) => (
                                                                <Link
                                                                href={''}
                                                                    onClick={logout}
                                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                                >
                                                                    Sign out
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                        :
                                        <div className='' >
                                            <button onClick={() => dispatch(LoginShow(!showLogin))} ref={loginbtn} className='rounded-sm text-base text-white bg-green-700 w-16 h-8 me-3'>Login</button>
                                            <button onClick={() => dispatch(SignUpShow(!showSignup))} className='max-[500px]:hidden rounded-sm text-base text-white bg-blue-500 w-16 h-8'>Signup</button>
                                        </div>}
                                </div>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out "
                                enterFrom="transform  -translate-x-40"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform translate-x-40 duration-100"
                                leaveTo="transform opacity-0 -translate-x-40 duration-100">
                                <Disclosure.Panel className="sm:hidden w-52 bg-gray-800 h-screen fixed ">
                                    <div className="space-y px-2 pb-3 pt-2 ">
                                        {navigation.map((item) => (
                                            <div>
                                            <Disclosure.Button
                                                key={item.name}
                                                as="a"
                                                href={item.href}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'block rounded-md px-3 py-2 text-base font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Disclosure.Button>
                                            </div>

                                        ))}
                                    </div>
                                </Disclosure.Panel>
                            </Transition>
                        </>

                    )}
                </Disclosure>
            </div>
        </div>

    )
}


export default Navbar
