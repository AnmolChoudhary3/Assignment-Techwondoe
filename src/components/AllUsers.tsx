import React, { useRef, useState } from "react";
import Badge from "./Badge";
import Button from "./Button";
import DataTable from "./DataTable";
import { useQuery } from "react-query";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { CSVLink } from "react-csv";
import Modal from './Modal';

function AllUsers() {
    interface UserType {
        id: string;
        name: string;
        status: boolean;
        email: string;
        last_login: string;
        role: string;
        img: string;
    }

    const [resData, setResData] = useState<Array<UserType>>([]);
    const { isLoading, error, data } = useQuery("repoData", () =>
        fetch("https://assignment-techwondoe.onrender.com/data")
            .then((res) => res.json())
            .then((data) => setResData(data.data))
    );

	

    // React.useEffect(() => {
    //   setResData(data?.data)
    // }, [])

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
    );

    //  if (isLoading) return (<>'Loading...'</>);

    //  if (error) return (<>An error has occurred:{error}</>)

    const handleDelete = (id: string) => {
        setResData((prev) => prev.filter((item) => item.id !== id));
    };

    const handleEdit = (user: UserType) => {
        setResData((prev) => prev.map((u) => (u.id === user.id ? user : u)));
    };

    async function postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'PUT', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
      }

    const addUser = (e: React.SyntheticEvent) => {
        e.preventDefault()
        const target = e.target as typeof e.target & {
            Email: { value: string };
            Name: { value: string };
            Role: { value: string };
            Status: { value: boolean };

        };
        
        let user = {
            id: "",
            name: target?.Name.value,
            status: target?.Status.value,
            email: target?.Email.value,
            last_login: Date.now().toString(),
            role: target?.Role.value,
            img: "http://dummyimage.com/202x100.png/5fa2dd/ffffff",
        }
        
        postData('https://assignment-techwondoe.onrender.com/data', user)
        .then((data) => {
            user.id=data.id
            setResData([user, ...resData]);
            addModal?.current?.close()

        });
    }

    const addModal = useRef<HTMLDialogElement>(null);

    const handleOpenAddModal = () => {
        addModal?.current?.showModal();
    };

    return (
        <div className=" mt-8 shadow-md border border-gray-100 rounded-lg ">
            <div className="flex justify-between p-5">
                <div className="">
                    <div className="flex gap-3 w-fit">
                        <h1 className="font-bold text-xl">Users</h1>
                        <Badge>{<p>{resData?.length} users</p>}</Badge>
                    </div>
                    <p className="text-gray-500 mt-2">
                        Manage your team members and their account permissions
                        here
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button isBlue={false}>
                        <CloudDownloadOutlinedIcon />
                        <CSVLink data={resData}>Download CSV</CSVLink>
                    </Button>
                    <div className="m-auto" onClick={handleOpenAddModal}>
                        <Button isBlue={true}>
                            <AddOutlinedIcon />
                            <p>Add user</p>
                        </Button>
                    </div>
                </div>
            </div>
            <Modal func={addUser} modal={addModal} />
            
            <DataTable columns={columns} data={resData} handleEdit={handleEdit} handleDelete={handleDelete}/>
        </div>
    );
}

export default AllUsers;
