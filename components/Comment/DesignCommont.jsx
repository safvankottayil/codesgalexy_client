import React, { useRef } from 'react'
import  {BsSendFill} from 'react-icons/bs'
import userAxios from '@/Axios/client'
import Cookies from 'js-cookie'
import toast from '@/components/Toast/index'
function DesignCommont({id,count,Update}) {
  const CommentRef=useRef(null)
  const token=Cookies.get('token')
 async function submit(){
  try{
    const Comment=CommentRef.current.value
    if(Comment==''){
     CommentRef.current.style.borderColor='red'
    }else{
    const res=await userAxios.post('/add-comment',{Comment,id},{headers:{Authorization:token}})
    if(res.data.status){
     Update(count+1)
     toast({type:'success',message:'comment Addedd'})
     CommentRef.current.value=''
    }else{

    }
  }
  }catch(err){
    console.log(1212);
    console.log(err);
  }
  }
  return (
   <>{token?
      <div  className='flex relative justify-start col-span-9 items-center'>
      <input onChange={()=>CommentRef.current.style.borderColor='white'} ref={CommentRef} placeholder='Add a comment' type="text" className='w-full bg-slate-200 pl-2 font-serif border-2 h-10 focus:outline-none rounded-md' />
     <BsSendFill onClick={submit} className=' absolute hover:cursor-pointer right-0 h-6 w-6 mr-3' />
     </div>
    :""} </>
  )
}

export default DesignCommont
