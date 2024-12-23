import React, { useState } from 'react'
import icon from "../../../public/Google.png"
import GoogleIcon from '@mui/icons-material/Google';
import { googleSignIn } from '../../lib/api/api';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {

  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handelSubmit = async () => {
    setIsLoading(true)
    const user = await googleSignIn()
    console.log(user)
    setIsLoading(false)
    localStorage.setItem("GoogleClass",user.uid)
    navigate("/")
  }

  return (
    <div className='sign_in-container' >
      <div className=' flex flex-col mb-7 items-center'>
        <img src={icon} />
        <h1 className='text-xl bold lg:text-3xl'>SignIn With Google</h1>
        <h2>Use your Google Account</h2>
      </div>
      <button onClick={handelSubmit} className='flex border-black border-solid border-2 p-3 bg-sky-600' >
        {isLoading ? (<>
          loading...
        </>
        ) : (
          <>
            <GoogleIcon className='text-black' />
            <h2 className='ml-1 text-black' >Sign In with Account</h2>
          </>
        )}
      </button>
    </div>
  )
}

export default SignIn
