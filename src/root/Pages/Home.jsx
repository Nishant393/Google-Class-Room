import React, { useEffect, useState } from 'react'
import ClassCard from '../../component/ClassCard'
import { getUserById } from '../../lib/api/api'

const Home = () => {
  
  const [ classes , setClasses] = useState([])
  const userUid = localStorage.getItem("GoogleClass")
  const [ isLoading , setIsLoading] = useState(true)
  
  const getAllClass = async()=>{
    const users = await getUserById(userUid)
    setClasses(users?.class || [] )
    setIsLoading(false)
  }
  
  useEffect(()=>{
    getAllClass()
  },[])
  return (
    <div style={{flexWrap:"wrap"}} className='p-5 flex gap-2 flex-wrap w-screen ' >
      {
        isLoading ?(
          <>
            Loading....
          </>
        ):(
          <>{
            classes.length == 0 ? (<>
            {/* this is part of then havent any classes */}
            there is no class that you join or create
            </>) :(
            classes.map((e)=>{
              return <ClassCard key={e} room={e} refreshClasses={getAllClass} />
            }) )
          }
          </>
        )
      }
      
    </div>
  )
}

export default Home
