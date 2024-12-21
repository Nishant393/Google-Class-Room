import React, { useEffect, useState } from 'react'
import { getUserById } from '../lib/api/api'

const UserData = ({ e }) => {
    const [data, setData] = useState({})
    const userData = async () => {
        const datas = await getUserById(e)
        setData(datas)
    }

    useEffect(() => {
        userData()
    }, [])
    return (
        <li className='flex ' >
            <img className='w-12 h-12' alt='hello' src={data.imageURL} />
            <p>{data.name}</p>
        </li>
    )
}

export default UserData
