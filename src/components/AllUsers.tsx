import React, { useState } from 'react'
import Badge from './Badge'
import Button from './Button'
import DataTable from './DataTable'
import { useQuery } from 'react-query'
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { CSVLink } from "react-csv";
import {userData} from "../Data"

function AllUsers() {

    // const { isLoading, error, data } = useQuery('repoData', () =>
    //  fetch('https://api.mockaroo.com/api/9e91da10?count=50&key=8f5c6d30').then(res =>
    //    res.json()
    //    )
    // )

    const [resData, setResData] = useState(userData)

    // React.useEffect(() => {
    //   setResData(data)
    // }, [data])
    
       const columns = React.useMemo(
           () => [
            
                 {
                   Header: "Name",
                   accessor: "name",
                 },
                 {
                   Header: "disabled",
                   accessor: "email",
                 },
                 {
                   Header: "Status",
                   accessor: "status",
                 },
                 {
                   Header: "Role",
                   accessor: "role",
                 },
                 {
                   Header: "Last Login",
                   accessor: "last_login",
                 },
                 {
                   Header: "disabled",
                   accessor: "img",
                 },
           ],
           []
       )

      //  if (isLoading) return (<>'Loading...'</>);
 
      //  if (error) return (<>An error has occurred:{error}</>)

 
  const handleDelete = (id: string) => {
    const newData = resData.filter((item) => item.id !== id)
    setResData(newData)
  }

  const handleEdit = (id: string) => {
    const newData = resData.filter((item) => item.id !== id)
    setResData(newData)
  }

  const handleAdd = () => {
    const newData = resData
    setResData(newData)
  }


  return (
    <div className="
    mt-8
    shadow-md
    border border-gray-100
    rounded-lg
    ">
        <div className="flex justify-between p-5">
            <div className="">
                <div className="flex gap-3 w-fit">
                    <h1 className='font-bold text-xl'>Users</h1>
                    <Badge>
                        {<p>{resData.length} users</p>}
                    </Badge>
                </div>
                <p className='text-gray-500 mt-2'>Manage your team members and their account permissions here</p>
            </div>
            <div className="flex gap-3">
                <Button isBlue={false}>
                    <CloudDownloadOutlinedIcon/>
                    <CSVLink data={resData}>Download CSV</CSVLink>
                </Button>
                <div className="m-auto" onClick={handleAdd}>
                  <Button isBlue={true}>
                      <AddOutlinedIcon/>
                      <p>Add user</p>
                  </Button>
                </div>
            </div>
        </div>

        <DataTable columns={columns} data={resData} />

    </div>
  )
}

export default AllUsers