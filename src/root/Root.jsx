import React from 'react'
import { Outlet } from 'react-router-dom'
import Top from '../component/Top'

const Root = () => {
  return (
    <div>
      <Top/>
      <Outlet/>
    </div>
  )
}

export default Root
