import { TabList } from '@mui/joy'
import { Tab, Tabs } from '@mui/joy'
import React from 'react'
import { Link, Outlet, useParams } from 'react-router-dom'

const Class = () => {
  
  return (
    <div className=''>
      <Tabs aria-label="Basic tabs" defaultValue={0}>
        <TabList sx={{ margin: "0 10px" }}  >
          <Tab
            sx={{ padding: "9px", fontSize: "16px" }}
            label="Tab 1"
            disableIndicator
          >
            <Link to={"./"}>Stream</Link>
          </Tab>
          <Tab
            sx={ { padding: "9px", fontSize: "16px" }}
            label="Tab 2"
            disableIndicator
          >
            <Link to={"./t"}>
              ClassWork
            </Link>
          </Tab>
          <Tab
            sx={{ padding: "9px", fontSize: "16px" }}
            label="Tab 3"
            disableIndicator
          >
            <Link to={"./pepole"}>
              Pepole
            </Link>
          </Tab>
        </TabList>
      </Tabs>
      <Outlet />
    </div >
  )
}

export default Class
