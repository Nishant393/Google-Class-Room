import React, { useEffect, useState } from 'react'
import { getClassById } from '../lib/api/api'
import { Link } from 'react-router-dom'

const ClassBar = ({ room }) => {
  const [docs, setDocs] = useState({})
  const data = async () => {
    const datas = await getClassById(room)
    setDocs(datas)
  }

  useEffect(() => {
    data()
  }, [])
  return (
    <Link to={`c/${room}`} sx={{ display: 'flex', gap: "2px", color: "#000", fontStyle: "none" }} >
      <div className=' my-3 p-1 flex cursor-pointer rounded-r-full hover:bg-sky-100 ' >
        <div className='flex justify-center'>
          <img src={docs.imageURL} className=' h-8  rounded-full' />
        </div>
        <div>
          <h2 className='ml-2 text-lg text-[18px] ' >{docs.className}</h2>
          <h2 className='ml-2 text-sm	 text-[14px] text-gray-700' >{docs.subject}</h2>
        </div>
      </div>
    </Link>
  )
}

export default ClassBar
