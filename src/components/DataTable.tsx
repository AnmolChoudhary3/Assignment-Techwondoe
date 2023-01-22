import React, { useRef } from "react";
import { usePagination, useSortBy, useTable } from "react-table";
import { Column } from "react-table";
import Badge from "./Badge";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Modal from "./Modal";
import DeleteModal from "./DeleteModal";

interface UserType {
    id: string;
    name: string;
    status: boolean;
    email: string;
    last_login: string;
    role: string;
    img: string;
}

const DataTable = ({
    columns,
    data = [],
	handleEdit,
	handleDelete,
}: {
    columns: Column<{}>[];
    data: {}[];
	handleEdit: (user: UserType) => void;
	handleDelete: (id: string) => void;
}) => {
    const resData = React.useMemo(() => data, [data]);

    const tableInstance = useTable(
        { columns, data, initialState: { pageIndex: 0 } },
        useSortBy,
        usePagination
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = tableInstance;

    const editModal = useRef<HTMLDialogElement>(null);
    const deleteModal = useRef<HTMLDialogElement>(null);

	const handleDeleteClick = (user: any) => {
        deleteModal?.current?.showModal();
		let form = deleteModal.current?.querySelector("form");
        form = form as typeof form & {
            Id: { value: string };
        };
		
		form.Id.value= user.id
    };

    const handleEditClick = (user: any) => {
        editModal?.current?.showModal();
        let form = editModal.current?.querySelector("form");
        form = form as typeof form & {
            Email: { value: string };
            Name: { value: string };
            Role: { value: string };
            Status: { value: boolean };
            Id: { value: string };
        };

        form.Name.value = user.name;
        form.Email.value = user.email;
        form.Status.checked = user.status;
        form.Role.value = user.role;
        form.Id.value = user.id;
    };

	async function postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
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

    const editUser = (e: React.SyntheticEvent) => {
		e.preventDefault()
		const target = e.target as typeof e.target & {
			Email: { value: string };
			Name: { value: string };
			Role: { value: string };
			Status: { value: boolean };
			Id: { value: string };
		};
		
		let user = {
			id: target?.Id.value,
			name: target?.Name.value,
			status: target?.Status.value,
			email: target?.Email.value,
			last_login: Date.now().toString(),
			role: target?.Role.value,
			img: "http://dummyimage.com/202x100.png/5fa2dd/ffffff",
		}
		
		postData('https://assignment-techwondoe.onrender.com/data', user)
		.then((data) => {
			handleEdit(user)
			editModal?.current?.close()

		});
    }

    return (
        // apply the table props
        <>
            <table className="w-full" {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr
                            className="border-t"
                            {...headerGroup.getHeaderGroupProps()}
                        >
                            {headerGroup.headers.map((column) => {
                                return (
                                    // Apply the header cell props
                                    column.Header !== "disabled" ? (
                                        <th
                                            className="text-center p-3 text-gray-700"
                                            {...column.getHeaderProps(
                                                column.getSortByToggleProps()
                                            )}
                                        >
                                            {column.render("Header")}
                                            <span>
                                                {column.isSorted
                                                    ? column.isSortedDesc
                                                        ? " ⬇"
                                                        : " ⬆"
                                                    : "⬇⬆"}
                                            </span>
                                        </th>
                                    ) : (
                                        <></>
                                    )
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                {/* Apply the table body props */}
                <tbody {...getTableBodyProps()}>
                    {
                        // Loop over the table rows
                        page.map((row) => {
                            // Prepare the row for display
                            prepareRow(row);
                            return (
                                // Apply the row props
                                <tr className="border-t" {...row.getRowProps()}>
                                    {
                                        // Loop over the rows cells
                                        row.cells.map((cell) => {
                                            // Apply the cell props
                                            return cell.column.Header ===
                                                "disabled" ? (
                                                <></>
                                            ) : (
                                                <td
                                                    className="p-2 text-center self-center"
                                                    {...cell.getCellProps()}
                                                >
                                                    {
                                                        // Render the cell contents

                                                        cell.column.Header ===
                                                        "Name" ? (
                                                            <div
                                                                key={
                                                                    cell.row
                                                                        .values
                                                                        .id
                                                                }
                                                                className="flex gap-5 p-2"
                                                            >
                                                                <img
                                                                    src={
                                                                        cell.row
                                                                            .values
                                                                            .img
                                                                    }
                                                                    alt=""
                                                                    className="my-auto w-12 h-12 rounded-full"
                                                                />
                                                                <div className="text-left">
                                                                    <p className="text-lg font-medium">
                                                                        {
                                                                            cell.value
                                                                        }
                                                                    </p>
                                                                    <p className="text-sm">
                                                                        {
                                                                            cell
                                                                                .row
                                                                                .values
                                                                                .email
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ) : cell.column
                                                              .Header ===
                                                          "Last Login" ? (
                                                            <p
                                                                key={
                                                                    cell.row
                                                                        .values
                                                                        .id
                                                                }
                                                            >
                                                                {cell.value}
                                                            </p>
                                                        ) : cell.column
                                                              .Header ===
                                                          "Role" ? (
                                                            <p
                                                                key={
                                                                    cell.row
                                                                        .values
                                                                        .id
                                                                }
                                                            >
                                                                {cell.value}
                                                            </p>
                                                        ) : cell.column
                                                              .Header ===
                                                          "Status" ? (
                                                            cell.value ? (
                                                                <Badge
                                                                    key={
                                                                        cell.row
                                                                            .values
                                                                            .id
                                                                    }
                                                                >
                                                                    <FiberManualRecordIcon
                                                                        className="self-center"
                                                                        fontSize="small"
                                                                    />{" "}
                                                                    <p>
                                                                        Active
                                                                    </p>
                                                                </Badge>
                                                            ) : (
                                                                <Badge
                                                                    key={
                                                                        cell.row
                                                                            .values
                                                                            .id
                                                                    }
                                                                    isActive={
                                                                        false
                                                                    }
                                                                >
                                                                    <FiberManualRecordIcon
                                                                        className="self-center"
                                                                        fontSize="small"
                                                                    />{" "}
                                                                    <p>
                                                                        Inactive
                                                                    </p>
                                                                </Badge>
                                                            )
                                                        ) : (
                                                            <></>
                                                        )
                                                    }
                                                </td>
                                            );
                                        })
                                    }

                                    <td className="p-2 text-center">
                                        <DeleteRoundedIcon onClick={() =>
                                            handleDeleteClick(row?.original)
                                        }
										className="opacity-70" />
                                    </td>
                                    <td
                                        className="p-2 text-center"
                                        onClick={() =>
                                            handleEditClick(row?.original)
                                        }
                                    >
                                        <EditRoundedIcon className="opacity-70" />
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>

			<Modal func={editUser} modal={editModal} />
			<DeleteModal deleteModal={deleteModal} handleDelete={handleDelete} />
            <div className="pagination flex justify-between mt-3 border-t px-5 py-2">
                {/* <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "} */}
                <button
                    className="px-3 py-1 border rounded"
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                >
                    {"<- Previous"}
                </button>

                <div className="flex gap-3">
                    {Array.from(Array(pageCount).keys()).map((curr) => (
                        <button
                            className={`${
                                pageIndex === curr
                                    ? "bg-gray-300"
                                    : "bg-gray-100"
                            } p-2 w-10 h-10 rounded`}
                            onClick={() => gotoPage(curr)}
                            key={curr}
                            value={curr}
                        >
                            {curr + 1}
                        </button>
                    ))}
                </div>

                <button
                    className="px-3 py-1 border rounded"
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                >
                    {"Next ->"}
                </button>

                {/* <h1>{pageIndex}</h1> */}
            </div>
        </>
    );
};

export default DataTable;
