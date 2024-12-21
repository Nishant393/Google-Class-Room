import React, { createContext, useState, useContext, useEffect } from 'react'
import { auth } from '../firebase/firebaseConfig'
import { useNavigate } from 'react-router-dom'

const INITIAL_USER = {
  name: "" ,
  email: "" ,
  uid: "",
  phoneNumber: "",
  imageURL: "",
}

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuth: false,
  checkAuthUser: async () => false,
}

const AuthContext = createContext(INITIAL_STATE)

const UserProvider = ({ children }) => {

  const [user, setUser] = useState(INITIAL_USER)
  const [isLoading, setIsLoding] = useState(false)
  const [isAuth, setIsAuth] = useState(false)
  const navigate = useNavigate()

  const checkAuthUser = () => {
    auth.onAuthStateChanged(async (User) => {
      if (User) {
        setUser({
          name: User?.displayName,
          email: User.email,
          uid: User.uid,
          phoneNumber: User.phoneNumber,
          imageURL: User.photoURL,
        })
        setIsAuth(true)
        return true
      }
    })
    return false
  }
  
  useEffect(() => {
    if(localStorage.getItem("GoogleClass")===null || localStorage.getItem("GoogleClass")===undefined){
      navigate("/sign-in")
    }
    checkAuthUser()
  }, [])

  const value = {
    user,
    isAuth,
    isLoading,
    checkAuthUser,
  }


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default UserProvider;

export const useUserContext = () => useContext(AuthContext);