import CloseIcon from '@mui/icons-material/Close';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LinkIcon from '@mui/icons-material/Link';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import { Dialog, Slide } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useParams } from 'react-router-dom';
import { getClassById, getUserById, saveMaterialToRoom } from '../../lib/api/api';
import PopLink from '../../component/PopLink';
import PopFile from '../../component/PopFile';
import MaterialList from '../../component/MaterialList';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Classwork = () => {

  const { id } = useParams()
  const userUid = localStorage.getItem("GoogleClass")
  const [open, setOpen] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  const [isPostLoading, setIsPostloading] = useState(false);
  const [announcementData, setAnnouncementData] = useState([]);
  const [linkOpen, setLinkOpen] = useState(false);
  const [docs, setDocs] = useState({})
  
  const [text, setText] = useState({
    links: [],
    file: [],
    URLs: [],
  });


  const [materialForm, setMaterialForm] = useState({
    title: "",
    postedBy: "",
    discription: "",
    link: "",
  });

  const data = async () => {
    const datas = await getClassById(id)
    setDocs(datas)
  }
  const isTeachersLogin = docs?.teacher?.uid===userUid;


  const handelPost = async () => {
    setIsPostloading(true)
    const data = await saveMaterialToRoom(id, text, materialForm)
    setOpen(false)
    getAnnouncement()
    setIsPostloading(false)
  }

  const getUser = async () => {
    const uid = localStorage.getItem("GoogleClass")
    const user = await getUserById(uid)
    setMaterialForm({postedBy:user})
  }

  const handelChange = (e) => {
    const { name, value } = e.target
    setMaterialForm({ ...materialForm, [name]: value })
  }

  const handleAddLink = () => {
    setText((prevLinks) => ({
      ...prevLinks,
      links: [...prevLinks.links, materialForm.link],
    }));
    setLinkOpen(false)
  };

  const handleAddUrl = (url) => {
    setText((prevLinks) => ({
      ...prevLinks,
      URLs: [...prevLinks.URLs, url],
    }));
  };

  const handleAddfiles = (files) => {
    setText((prevLinks) => ({
      ...prevLinks,
      file: [...prevLinks.file, files],
    }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickLinkOpen = () => {
    setLinkOpen(true);
  };

  const handleLinkClose = () => {
    setLinkOpen(false);
  };

  const onDrop = useCallback(acceptedFiles => {
    const url = URL.createObjectURL(acceptedFiles[0])
    handleAddUrl(url)
    handleAddfiles(acceptedFiles[0])
  }, [])

  const getAnnouncement = async () => {
    setIsloading(true)
    const classData = await getClassById(id)
    const announcementDoc = classData?.material
    setAnnouncementData(announcementDoc)
    setIsloading(false)
  }

  useEffect(() => {
    getUser()
    data()
    getAnnouncement()
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <div className=' flex justify-center  m-auto w-full align-middle  gap-3 my-5' >
      {isLoading ? (
        <>
          loading
        </>
      ) : (
        <div className='w-2/3' >
          {isTeachersLogin ? (
            <div className='w-full flex gap-8 flex-col float-start' >
              <button onClick={handleClickOpen} className='w-24 p-3  rounded-full text-white cursor-pointer bg-blue-700' >
                create
              </button>
              <Dialog TransitionComponent={Transition} fullScreen onClose={handleClose} sx={{ height: "100vh" }} open={open}>
                <div className='p-5' >
                  <nav className='flex justify-between w-full '>
                    <div className='flex gap-4'>
                      <CloseIcon className='cursor-pointer text-gray-500 ' sx={{ fontSize: "38px" }} onClick={handleClose} />
                      <LibraryBooksIcon sx={{ color: "blue", fontSize: "30px" }} />
                      <h1 className='base-medium text-gray-500' >Material</h1>
                    </div>
                    <div>
                      <button onClick={handelPost} disabled={materialForm.title !== "" ? false : true } className={materialForm.title !== "" ? "postButton bg-blue-600 " : " bg-slate-400 postButton  " }>{isPostLoading ? "posting..." : "Post"}</ button>
                    </div>
                  </nav>
                  <div className='flex gap-5 flex-col mt-5' >
                    <form className='flex gap-5 w-full p-5 rounded-xl border-gray-200 flex-col border-2	 ' >
                      <Input
                        placeholder="Title"
                        variant="solid"
                        onChange={handelChange}
                        name="title"
                        sx={{ backgroundColor: "#e5e7eb ", color: "#1f2937" }}
                      />

                      <Textarea
                        name='discription'
                        onChange={handelChange}
                        sx={{ backgroundColor: "#e5e7eb ", color: "#1f2937" }}
                        minRows={6} variant="solid" placeholder="discription" />

                      {text.links.map((e) => {
                        return <PopLink isTeachersLogin key={e} link={e} />
                      })}

                      {text.URLs.map((e) => {
                        return <PopFile isTeachersLogin key={e} link={e} />
                      })}

                    </form>
                    <form className='flex gap-7 w-full p-5 rounded-xl border-gray-200 flex-col border-2	 ' >
                      <h6>Attach</h6>
                      <div className='flex w-full justify-center gap-3'>
                        <div>
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <UploadFileIcon sx={{ fontSize: "50px" }} className='p-2 rounded-full hover:bg-slate-300 cursor-pointer ' />
                          </div>
                          <h2 className='text-[20px]' >Upload</h2>
                        </div>
                        <div className='flex ml-5 flex-col justify-center ' >
                          <LinkIcon sx={{ fontSize: "50px" }} onClick={handleClickLinkOpen} className='p-2 rounded-full hover:bg-slate-300 cursor-pointer ' />
                          <h2 className='text-[20px]' >Link</h2>

                          <Dialog onClose={handleLinkClose} sx={{ height: "100vh" }} open={linkOpen}>
                            <div className='flex flex-col gap-8 m-9' >
                              <h1>Add Link</h1>
                              <Input
                                placeholder="Title"
                                name='link'
                                id="link"
                                variant="solid"
                                onChange={handelChange}
                                sx={{ padding: "20px", backgroundColor: "#e5e7eb ", color: "#1f2937" }}
                              />
                              <div className='flex gap-3 w-full justify-end' >
                                <button onClick={handleLinkClose} >Cancel</button>
                                <button className={materialForm.link == "" ? "text-gray-500" : ""} onClick={handleAddLink} disabled={materialForm.link == "" ? true : false} > Add link </button>
                              </div>
                            </div>
                          </Dialog>

                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog>
              <div className='flex gap-4 flex-col' >
                {
                  announcementData?.map((e, index) => {
                    return <MaterialList key={index} announce={e} />
                  })
                }

              </div>
            </div>
          ) : (
            <>
              {
                announcementData?.map((e, index) => {
                  if(announcementData.length == 0 ){

                  return (
                    <>
                    ijijiojjij
                    </>)
                  }
                  else{
                    return  <MaterialList key={index} announce={e} />
                  }
                })
              }
            </>
          )
          }
        </div >
      )
      }

    </div >
  )
}
export default Classwork
