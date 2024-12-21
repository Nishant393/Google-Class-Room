import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import profile from "../../public/Logo.svg"
import AddIcon from '@mui/icons-material/Add';
import { ModalClose, Drawer, Box, Dropdown, MenuButton, Menu, ModalDialog } from '@mui/joy';
import { useUserContext } from '../lib/Provider/UserProvider';
import { createClass, getAllClasses, joinClassById, saveClassToUser, signOutFn } from '../lib/api/api';
import { MenuItem, Modal } from '@mui/material';
import CommonDrawer from './CommonDrawer';

const Top = () => {

  const [open, setOpen] = useState(false);
  const [create, setCreate] = useState(false);
  const [join, setJoin] = useState(false);
  const [isInclude, setIsInclude] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useUserContext()
  const [classs, setClasss] = useState()
  const navigate = useNavigate()
  
  const [joinRoom, setJoinRoom] = useState({
    classCode: "",
    student: user,
  });
  
  function getFirstWord(sentence) {
    const words = sentence.split(' ');
    return words.length > 0 ? words[0] : '';
  }


  const [createRoom, setCreateRoom] = useState({
    className: "",
    teacher: user,
    roomNumber: "",
    subject: "",
  });

  const handelCreateChange = (e) => {
    const { name, value } = e.target
    setCreateRoom({ ...createRoom, [name]: value })
  }

  const handelCreate = async () => {
    await createClass(createRoom).then(async (e) => {
      setIsLoading(true)
      setClasss(e)
      navigate(`/c/${e}`)
      setCreate(false)
      await saveClassToUser(user.uid, e)
    })
    setIsLoading(false)
  }

  const handelSignOut = async () => {
    await signOutFn().then(() => {
      navigate("/sign-in")
    })
  }

  const checkId = async (e) => {
    const check = await getAllClasses()
    setIsInclude(check.includes(e))
  }


  const handelChange = async (e) => {
    const { name, value } = e.target
    setJoinRoom({ ...joinRoom, [name]: value })
    checkId(value)
  }

  const handelJoin = async () => {
    setIsLoading(true)
    const data = await saveClassToUser(localStorage.getItem("GoogleClass"), joinRoom.classCode)
    await joinClassById(joinRoom.classCode, user.uid)
    if(await joinClassById(joinRoom.classCode, user.uid)){
      navigate(`./c/${joinRoom.classCode}`)
      setJoin(false)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    setCreateRoom({ teacher: user })
  }, [user])

  return (
    <div className='flex-between w-screen px-5  py-3 border ' >
      <div className='flex gap-4' >
        <Box sx={{ display: 'flex' }}>
          <MenuIcon sx={{ fontSize: 30 }} onClick={() => setOpen(true)} className='cursor-pointer font-serif ' />
          <Drawer open={open} className="flex items-center justify-center" onClose={() => setOpen(false)}>
            <ModalClose />
            <CommonDrawer/>
          </Drawer>
        </Box>
        <Link to={"/"} className='flex gap-2' >
          <img className=' h-9 w-9  ' src={profile} alt='profile' />
          <h1 className=' md:text-[25px] base-medium text-gray-600 hover:text-green-600 hover:underline' >ClassRoom</h1>
        </Link>
      </div>
      <div className='flex gap-4'>
        <Dropdown >
          <MenuButton
            slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
            sx={{ border: "none" , padding:"4px" , borderRadius:"100px" }}
          >
            <AddIcon sx={{ fontSize: 30 }} className='cursor-pointer' />
          </MenuButton>
          <Menu className='m-2 flex bg-sky-50 justify-center items-center '   >
            <MenuItem onClick={() => setCreate(true)} >Create Class</MenuItem>
            <MenuItem onClick={() => setJoin(true)} >Join Class</MenuItem>
          </Menu>
        </Dropdown>
        <Dropdown >
          <MenuButton
            slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
            sx={{ border: "none" }}
          >
            <img className='rounded-full h-8 w-8 cursor-pointer  ' src={user?.imageURL} alt='profile' />
          </MenuButton>
          <Menu className='m-2 flex bg-slate-100 justify-center items-center w-full ' sx={{ width: "30vw", background: "#f1f5f9", padding: "20px" }} >
            <h1 className=' my-4 ' >{user?.email}</h1>
            <img src={user?.imageURL} alt='profile' className='w-28 h-28 my-4 rounded-full' />
            <h1 className=' my-4 font-bold ' >Hi, {getFirstWord(user.name)} !</h1>
            <button className='signOut border-dark-4 border-solid border-2 ' onClick={handelSignOut} > signOut  </button>
          </Menu>
        </Dropdown>
      </div>

      {/* -------------modal create dialog------------ */}

      <Modal
        open={create}
        onClose={() => setCreate(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <ModalDialog
          color="primary"
          layout="center"
          size="lg"
          variant="solid"
          sx={{ background: "#fff" }}
          className="w-2/5"
        >
          <ModalClose sx={{ background: "#fff", color: "#000" }} onClick={() => setCreate(false)} />
          <div className='flex flex-col gap-10' >
            <h2 className='text-dark-2 font-semibold' >Create Class</h2>
            <input
              type="text"
              onChange={handelCreateChange}
              name="className" value={createRoom.className}
              placeholder='class name (required)'
              className='shad-input'
            />
            <input
              type="text"
              onChange={handelCreateChange}
              name="subject"
              value={createRoom.subject}
              placeholder='subject'
              className='shad-input'
            />
            <input
              type="text"
              onChange={handelCreateChange}
              name="roomNumber"
              value={createRoom.roomNumber}
              placeholder='roomNumber'
              className='shad-input'
            />
            <div className='w-full flex justify-end gap-3' >
              <button className='text-dark-1' onClick={handelCreate} >
                {isLoading ? "creating.." : "create"}
              </button>
            </div>
          </div>
        </ModalDialog>
      </Modal>

      {/* -------------modal join dialog------------ */}

      <Modal
        open={join}
        onClose={() => setCreate(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <ModalDialog
          color="primary"
          layout="center"
          size="lg"
          variant="solid"
          sx={{ background: "#fff" }}
          className="w-2/5"
        >
          <ModalClose sx={{ background: "#fff", color: "#000" }} onClick={() => setJoin(false)} />
          <div className='flex flex-col gap-3 p-5' >
            <h2 className='text-dark-2 font-semibold' >Join Class</h2>
            <div className="rounded-lg w-full p-4 border-gray-40000 border-solid border-2  " >
              <h4 className='text-gray-400' > You're currently signed in as </h4>
              <div className='flex gap-3 my-4 ' >
                <img src={user.imageURL} className=' rounded-full' alt="profile" />
                <div>
                  <h2 className='text-black font-bold' >{user.name} hell </h2>
                  <h2 className='text-gray-300' >{user.email} hell </h2>
                </div>
              </div>
            </div>
            <div className="rounded-lg w-full p-4 border-gray-40000 border-solid border-2  " >
              <h4 className='text-gray-500' > Class code </h4>
              <h4 className='text-gray-400 base-regular ' > Ask your teacher for the class code, then enter it here.</h4>
              <div className='flex' >
                <input
                  type="text"
                  onChange={handelChange}
                  name="classCode"
                  value={joinRoom.classCode}
                  placeholder='Class Code'
                  className='shad-input'
                />
              </div>
            </div>
            <div className='w-full flex justify-end gap-3' >
              <button className={isInclude ? "text-dark-1 font-bold " : "text-gray-500 font-bold "} disabled={isInclude ? false : true} onClick={handelJoin} >
                {isLoading ? "joining.." : "join"}
              </button>
            </div>
          </div>
        </ModalDialog>
      </Modal>
    </div >
  )
}

export default Top

