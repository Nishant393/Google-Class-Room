import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { MenuItem, Dropdown, Menu, MenuButton } from '@mui/joy';
import { Button, Link } from '@mui/material';
import Snackbar from '@mui/joy/Snackbar';
import { deleteClass, getClassById, unenrolClass } from '../lib/api/api';


const ClassCard = ({ room, refreshClasses }) => {
  const userUid = localStorage.getItem("GoogleClass")
  const [openF, setOpenF] = useState(false)
  const [openT, setOpenT] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [docs, setDocs] = useState({})
  // const [isDeleteLoading, setIsDeleteLoading] = useState(false)
  
  const data = async () => {
    const datas = await getClassById(room)
    setDocs(datas)
  }
  const isTeachersLogin = docs?.teacher?.uid===userUid;

  const delete_class = async () => {
    setIsLoading(true)
    const isDelete = await deleteClass(docs.classCode, userUid)
    if (isDelete) {
      refreshClasses()
    }
    setIsLoading(false)
    if(isDelete){
      setOpenT(true)
    }else{
      setOpenF(true)
    }
  }
  const unenrol_class = async () => {
    setIsLoading(true)
    const isDelete = await unenrolClass(docs.classCode, userUid)
    if (isDelete) {
      refreshClasses()
    }
    setIsLoading(false)
    if(isDelete){
      setOpenT(true)
    }else{
      setOpenF(true)
    }
  }

  const handleCloseF = () => {
    setOpenF(false);
  };

  const handleCloseT = () => {
    setOpenT(false);
  };

  useEffect(() => {
    data()
  }, [])
  return (
    <div style={{ background: "#1d4ed8", padding: "1rem" }} className='bg-blue-700 rounded-lg h-64 md:w-72 w-full lg:w-96  gap-4 flex justify-between ' >
      <div className='flex gap-3 flex-col' >

        <Link href={`./c/${room}`} className='h2-bold text-light-2' >
          <h1 className='h2-bold text-light-2' > {docs.className} </h1> </Link>
        <h3 className='text-light-2' > {docs.classCode} </h3>
        <h3 className='subtle-semibold text-light-2' > {docs.subject} </h3>
        <div className='w-full flex justify-start' >
          <img src={docs.teacher?.imageURL} className='rounded-full' alt="profile" />
        </div>
      </div>

      <div>
        <Dropdown >
          <MenuButton
            slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
            
          // className={ isTeachersLogin ? 'text-white ': 'text-white hidden '}
          >
            <AddIcon className={isTeachersLogin ? 'text-white ' : 'text-white hidden '} />
          </MenuButton>
          <Menu className='m-2 flex bg-sky-50 justify-center items-center '  >
            <MenuItem >
            {
              isTeachersLogin? <Button onClick={delete_class} >Delete</Button>:
              <Button onClick={unenrol_class} >unenrol</Button>
            }
             
            </MenuItem>
          </Menu>
        </Dropdown>
      </div>
      {/* snackbar */}
      <Snackbar
        autoHideDuration={5000} 
        open={openT}
        onClose={handleCloseT}
        color="success"
        >
        Delete Sucessesfuly !!!
      </Snackbar>
      <Snackbar
        autoHideDuration={5000} 
        anchorOrigin={ {vertical:"top", horizontal: "right"} }
        open={openF}
        color="danger"
        onClose={handleCloseF}
      >
        Something Went Wrong !!!
      </Snackbar>
    </div>

  )
}

export default ClassCard
