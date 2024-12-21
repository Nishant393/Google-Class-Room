import React, { useEffect, useState } from 'react'
import { getClassById } from '../../lib/api/api'
import { useParams } from 'react-router-dom'
import UserData from '../../component/UserData'

const Pepole = () => {
  const { id } = useParams()
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const student = data.student || []
  const classData = async () => {
    const datas = await getClassById(id)
    setData(datas)
    setIsLoading(false)
  }

  useEffect(() => {
    classData()
  }, [])

  return (
    <div className=' flex justify-center  m-auto w-full align-middle  gap-3 my-5' >
      {isLoading ? (
        <>
          loading
        </>
      ) : (
        <div className='w-3/5' >
          <div id="teacher" className='w-full gap-3 flex flex-col' >
            <h1 className='h1-semibold' >Teachers</h1>
            <hr />
            <ul className='gap-3 flex flex-col' >
              <li className='flex ' >
                <img className='w-12 h-12' alt='hello' src={data.teacher.imageURl} />
                <p>{data.teacher.name}</p>
              </li>
            </ul>
          </div>
          <div id="classmets" className='w-full mt-5 gap-3 flex flex-col' >
            <div className='flex justify-between ' >
              <h1 className='h1-semibold  ' >Classmets</h1>
              <h2> {student.length} students </h2>
            </div>
            <hr />
            <ul className='gap-3 flex flex-col' >
              {student.map((e) => {
                return (
                  <UserData e={e} key={e} />
                )
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default Pepole
