'use client'
import React, { useRef } from 'react'
import {MoonLoader} from 'react-spinners'
import Editor from '@monaco-editor/react'
// import { Html } from 'next/document'
function  Editors({value,language,Mount}) {
  const data=useRef(null)
  return (
    <Editor
             language={language}
             height={'100%'}
             width={'100%'}
             theme='vs-dark'
             value={value}
             onMount={(editor,monoco)=>{
                  data.current=editor
             }}
             onChange={()=>Mount(data.current.getValue())}
             loading={<MoonLoader width={'100px'} color='green' />}
             options={{
                minimap:{
                    // enabled:false
                },
                fontSize:'16',
                wordWrap:'on'
             }}
                />
  )
}

export default Editors
