import React, { useEffect, useState } from 'react'
import ClassPoster from '../../component/ClassPoster'
import { getClassById, getUserById } from '../../lib/api/api'
import { useParams } from 'react-router-dom'
import FileBox from '../../component/FileBox'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase/firebaseConfig'

const Stream = () => {

  const [announcementData, setAnnouncementData] = useState([])
  const [classData, setClassData] = useState({})
  const [open, setOpen] = useState([])
  const { id } = useParams()
  var x = window.matchMedia("(min-width: 1280px)")

  const getAnnouncement = async () => {
    const classRef = doc(db, "rooms", id)

    const classDoc = await getDoc(classRef)
    const classDatas = classDoc.data()
    setClassData(classDatas)
    const announcementDoc = classDatas?.material
    setAnnouncementData(announcementDoc)
  }


  useEffect(() => {
    getAnnouncement()
  }, [])

  return (
    <div className='m-3 flex gap-3 flex-col ' >
      <ClassPoster a={classData} />
      <div className='flex flex-row gap-2 ' >
        <div className='w-1/5 max-xl:hidden   ' >
          <div className='flex gap-3 border-2 border-gray-300 p-4 rounded-lg flex-col  shadow-sm' >
            <h3 className='text' >Class Code </h3>
            <h2 className='text-xl text-blue-600' >{id}</h2>
          </div>
        </div>
        <div  style={x? {"width":"100%"}:{"width":"80%"}} className='max-xl:w-full'  >
          {announcementData?.map((e, index) => {
            return <FileBox key={index} announce={e} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Stream
