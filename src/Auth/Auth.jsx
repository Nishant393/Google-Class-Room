import React from 'react'
import { Outlet } from 'react-router-dom'

const Auth = () => {
  return (
    <div className='flex items-center justify-center w-full'>
      <Outlet/>
    </div>
  )
}

export default Auth
