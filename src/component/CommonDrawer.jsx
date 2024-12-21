import HomeSharpIcon from '@mui/icons-material/HomeSharp'
import GroupIcon from '@mui/icons-material/Group'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { useUserContext } from '../lib/Provider/UserProvider'
import { useEffect, useState } from 'react'
import { getUserById, signOutFn } from '.././lib/api/api'
import ClassBar from './ClassBar'
import { Link, useNavigate } from 'react-router-dom'


const CommonDrawer = () => {

  const [classes, setClasses] = useState([])
  const userUid = localStorage.getItem("GoogleClass")
  const { user } = useUserContext()
  const navigate = useNavigate()
  const getAllClass = async () => {
    const users = await getUserById(userUid)
    setClasses(users?.class || [])
  }

  const handelSignOut = async () => {
    await signOutFn().then(() => {
      navigate("/sign-in")
    })
  }

  useEffect(() => {
    getAllClass()
  }, [])


  return (
    <div className='h-full  text-2xl' >
      <div className='m-2' >
        <h2>Classroom</h2>
      </div>
      <hr className='text-black w-full ' />
      <div className='flex my-3 pr-7 p-1 bg-gray-100 border-solid border-2 border-sky-300 rounded-r-full justify-between ' >
        <div className='flex' >
          <img src={user.imageURL} className=' h-14 rounded-full' />
          <div className='gap-0.5 flex flex-col ml-3 '>
            <h2 className='text-[20px]' >{user.name}</h2>
            <h2 className='text-[14px] text-gray-700 ' >{user.email}</h2>
          </div>
        </div>
        <div>
          <ExitToAppIcon onClick={handelSignOut} className=' cursor-pointer hover:bg-gray-100' />
        </div>
      </div>
      <hr className='text-black w-full ' />
        <Link to={"/"} sx={{display:'flex', gap:"2px",color:"#000" , fontStyle:"none"}} >
      <div className='flex m-1 cursor-pointer rounded-r-full hover:bg-sky-100 ' >
          <HomeSharpIcon className='mt-2' />
          <h2 className='text-[20px] ml-2 my-1 '>Home</h2>
      </div>
        </Link>
      <hr className='text-black w-full ' />
      <div className='mx-2' >
        <div className='flex mt-3 ' >
          <GroupIcon />
          <h2 className=' text-[20px]' >Teaching</h2>
        </div>

        {
          classes.map((e) => {
            return <ClassBar key={e} room={e} />
          })

        }
      </div>
      <hr className='text-black w-full ' />
    </div>
  )
}

export default CommonDrawer
