import React from 'react'
import { userUrl } from '@/url'
import { Htmlconverter } from '../Html'
import Link from 'next/link'
import DesignLike from '@/components/DesignLike/DesignLike'
import DesignSaved from '@/components/DesignLike/DesignSaved'
import DesignSearch from '../DesignSearch/DesignSearch'
const getData = async () => {
    const res = await fetch(userUrl + '/designs', {
        next: {
            revalidate: 10
        }
    })
    const repo = await res.json()
    return repo.Data
}

async function ShowDesign() {
    const data = await getData()
    return (
        <div className='mx-2 mb-2 mt-1 md:m-4 flex flex-col w-full'>
            <DesignSearch/>
            <div className='w-full grid gap-1 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
                {data.map((item) => {
                     const HTMLcode=Htmlconverter(item.html,item.css,item.js)
                    return (
                        <>
                            <div key={item._id} className='bg-slate-100 rounded-sm   '>
                            <div className='  m-2 rounded-md bg-black'>
                                <iframe className='h-80 w-full border-2 border-gray-400 rounded-sm' srcDoc={HTMLcode} ></iframe>
                            </div>
                            <div className='flex justify-between items-center w-full '>
                                    <div className='flex'>
                                        <div className='w-14'>
                                            <Link href={'/user/'+item.UserId._id}>
                                            {item.UserId.image ? <img className='bg-black rounded-full ml-2 mb-2 h-14 w-14' src={item.UserId.image} /> :
                                                <div className='bg-black rounded-full ml-2 mb-2 h-14 w-14'></div>
                                            }
                                            </Link>
                                        </div>
                                        <div className='flex flex-col pl-2 min-w-[100px] '>
                                            <p className='text-lg pl-2 w-[130px] 2xl:max-w-[200px] font-bold capitalize truncate'>{item.title}</p>
                                            <p className='text-md pl-2 font-semibold capitalize'>{item.UserId.name}</p>
                                            {/* <span className='whitespace-nowrap text-xs'>12 likes</span> */}
                                        </div>
                                    </div>
                                    <div className='flex items-center '>
                                        <DesignLike id={item._id} w={'w-6'} h={'h-7'} Like={true} />
                                        <DesignSaved id={item._id}  w={'w-5 mt-[7px] mx-2 mb-[2px]'} h={'h-5'} saved={true} />

                                        <Link   href={`/view/${item._id}`} className='bg-black h-8 font-bold text-sm mr-2 rounded-md p-2 text-white'>Show</Link>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })

                }
            </div>
        </div>
    )
}

export default ShowDesign
