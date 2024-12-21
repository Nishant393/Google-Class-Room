import React from 'react'

const PopLink = ({ link },isTeacherLogin) => {

    return (
            
        <div className='flex gap-4 h-30 p-5 border-2 border-gray-300 rounded-lg justify-between cursor-pointer w-full' >
            <div style={{"wordWrap": "break-word"}} className='flex flex-col break-words w-3/4' >
                <a href={link} className='hover:text-blue-700 text-xl' >Link</a>
                <a style={{"wordWrap": "breakWord"}} className='text-gray-600  break-words ' href={link}> {link} </a>
            </div>
            <div className={isTeacherLogin ? "hidden" : "flex"}   >
                <button> cancel </button>
            </div>
        </div>
    )
}

export default PopLink
