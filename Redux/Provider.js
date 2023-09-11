'use client'
import {store}  from '../Redux/store'
import { Provider } from 'react-redux'

export const ClientProvider=({children})=>{
    return(
       <Provider store={store}>
         
          {children}
       </Provider>
    )
}