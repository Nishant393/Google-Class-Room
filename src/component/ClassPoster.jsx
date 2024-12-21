import React, { useState } from 'react'
import InfoIcon from '@mui/icons-material/Info';

const ClassPoster = ({a}) => {
    
    const [info ,  setInfo ] = useState(false)

  return (
    <div>
      <div className={`${ info ? "" :" " } `}>
        <div className='bg-blue-600 p-3 w-full h-64 rounded-lg border-2 border-solid shadow-xl border-white flex justify-between align-middle '>
          <div className='text-white align-bottom h-full ' >
          <h1 className='text-[40px] font-bold ' >class</h1>
          <h2 className='text-[20px]' >class</h2>
          </div>
          <div>
            <button onClick={ ()=>{ info ? setInfo(false) : setInfo(true)} }>
              <InfoIcon style={{color:"#ffff"}} />
            </button>
          </div>
        </div>
        <div  className={` border-2 border-solid shadow-xl border-white  border-t-0 -translate-y-2 transition-transform rounded-b-2xl p-3 ${info ? "flex bg-slate-100 h-20 " : " bg-slate-50 hidden "}`  } >
          <ul>
            <li><b>ClassCode :</b> {a.classCode} </li>
            <li><b>subject :</b> {a.subject} </li>
            <li><b>room :</b> {a.room} </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ClassPoster