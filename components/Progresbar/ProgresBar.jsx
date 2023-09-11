'use client'
import React from 'react'
import { Next13ProgressBar } from 'next13-progressbar';
function ProgresBar({children}) {

    return (
        <>
       
            {children}
            <Next13ProgressBar height="8px" color="#0A2FFF" options={{ showSpinner: true }} showOnShallow />
      
        </>
      );
  
}

export default ProgresBar
