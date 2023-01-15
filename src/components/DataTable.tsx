import React from 'react'
import { usePagination, useSortBy, useTable } from 'react-table'
import { Column } from 'react-table'
import Badge from './Badge';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';


const DataTable = ({columns, data=[]}: { columns: Column<{}>[]; data: {}[]}) => {
const resData = React.useMemo(() => data, [data])

    
const tableInstance = useTable({ columns, data, initialState: { pageIndex: 0 }}, useSortBy, usePagination, )
 
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
    state: { pageIndex, pageSize }
 } = tableInstance


 return (
   // apply the table props
   <>
    <table className='w-full'{...getTableProps()}>
        <thead>
        {headerGroups.map(headerGroup => (
            <tr className='border-t' {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => { 
              
              return(
                // Apply the header cell props
                column.Header!=='disabled' ?
                <th className='text-center p-3 text-gray-700'{...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <span>
                        {column.isSorted
                        ? column.isSortedDesc
                        ? ' ⬇'
                        : ' ⬆'
                        : '⬇⬆'}
                    </span>
                </th>
                : <></>
                        
            )})}
            </tr>
        ))}
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
        {// Loop over the table rows
        page.map(row => {
            // Prepare the row for display
            prepareRow(row)
            return (
            // Apply the row props
            <tr className='border-t' {...row.getRowProps()}>
                {// Loop over the rows cells
                row.cells.map(cell => {
                // Apply the cell props
                return (
                  cell.column.Header === "disabled" ? <></> :
                    <td className='p-2 text-center self-center'{...cell.getCellProps()}>
                      {// Render the cell contents

                        cell.column.Header === "Name"
                          ? <div key={cell.row.values.id} className='flex gap-5 p-2'>
                              <img src={cell.row.values.img} alt="" className='my-auto w-12 h-12 rounded-full'/>
                              <div className="text-left">
                                <p className='text-lg font-medium'>{cell.value}</p>
                                <p className='text-sm'>{cell.row.values.email}</p>
                              </div>
                            </div>
                          : cell.column.Header === "Last Login"
                          ? <p key={cell.row.values.id} >{cell.value}</p>
                          : cell.column.Header === "Role"
                          ? <p key={cell.row.values.id} >{cell.value}</p>
                          :cell.column.Header === "Status" 
                            ? cell.value ?<Badge  key={cell.row.values.id} ><FiberManualRecordIcon className='self-center' fontSize='small'/> <p>Active</p></Badge> : <Badge  key={cell.row.values.id} isActive={false}><FiberManualRecordIcon className='self-center' fontSize='small'/> <p>Inactive</p></Badge>
                            : <></>
                      }
                    </td>
                )
                })}
                <td className='p-2 text-center'>
                    <DeleteRoundedIcon className='opacity-70'/>
                </td>
                <td className='p-2 text-center'>
                    <EditRoundedIcon className='opacity-70'/>
                </td>


            </tr>
            )
        })}
        </tbody>
    </table>

    <div className="pagination flex justify-between mt-3 border-t px-5 py-2">
        {/* <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "} */}
        <button className='px-3 py-1 border rounded' onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<- Previous"}
        </button>
        
        <div className="flex gap-3">
          {Array.from(Array(pageCount).keys()).map((curr) => (
            
            <button className={`${pageIndex === curr ? 'bg-gray-300' : 'bg-gray-100'} p-2 w-10 h-10 rounded` } onClick={() => gotoPage(curr)}
            key={curr} value={curr}>
              {curr+1}
            </button>
          ))}
        </div>

        <button className='px-3 py-1 border rounded' onClick={() => nextPage()} disabled={!canNextPage}>
          {"Next ->"}
        </button>

        {/* <h1>{pageIndex}</h1> */}
      </div>

</>
 )
}




export default DataTable