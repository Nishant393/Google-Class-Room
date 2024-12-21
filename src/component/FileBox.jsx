import React, { useState } from 'react'
import PopLink from './PopLink';
import PopFile from './PopFile';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';


const FileBox = ({ announce }) => {

  const [on, setOn] = useState(false)

  return (
    <div className={` ${on ? "border-2 rounded-lg  " : ""} `}>
      <div className={`w-full p-5  hover:bg-slate-100 rounded-lg ${on ? " border-2 border-blue-600 " : "border-2"} `}>
        <button onClick={() => { on ? setOn(false) : setOn(true) }} className='w-full flex flex-row justify-between' >
          <div className='flex gap-3' >
            <div className='rounded-full p-2 bg-gray-600' >
              <TextSnippetIcon className='text-white text-xl ' />

            </div>
            <p>{announce?.postedBy.name} posted a new material :{announce.title}</p>
          </div>
          <button>:</button>
        </button>
      </div>
      <div className={`p-4 rounded-t-none rounded-lg ${on ? "flex" : "hidden"}  `}>
        <div>
          <p>{announce?.description}</p>
        </div>
        <div className={"grid grid-cols-2 gap-3"} >
          {announce?.links.map((e) => {
            return <PopLink isTeachersLogin={true} key={e} link={e} />
          })}

          {announce?.URLs.map((e) => {
            return <PopFile isTeachersLogin={true} key={e} link={e} />
          })}
        </div>
      </div>
    </div>
  )
}

export default FileBox
