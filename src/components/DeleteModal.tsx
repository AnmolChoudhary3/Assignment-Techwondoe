import React from 'react'

const DeleteModal:React.FC<{deleteModal: React.RefObject<HTMLDialogElement>, handleDelete: (id: string) => void}> = ({deleteModal, handleDelete}) => {

    async function postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
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

    const deleteUser = (e: React.SyntheticEvent) => {
		e.preventDefault()
		const target = e.target as typeof e.target & {
			Id: { value: string };
		};
        
		postData('https://assignment-techwondoe.onrender.com/data', {id: target?.Id.value})
		.then((data) => {
			handleDelete(target?.Id.value)
			deleteModal?.current?.close()

		});
    }


  return (
    <dialog ref={deleteModal} className="rounded-xl p-10">
        <form onSubmit={deleteUser} className="grid place-content-center gap-3">
            <input id="Id" name="Id" type="text" className="hidden"/>
            <p>Click on confirm to delete the user</p>
            <div className="w-full flex justify-around">
                <button className="bg-blue-600 rounded text-white p-2 px-4 col-span-2" type='submit'>Confirm</button>
                <div className="cursor-pointer bg-gray-300 rounded text-black p-2 px-4 col-span-2 " onClick={()=> deleteModal?.current?.close()}>Cancel</div>
            </div>
        </form>
    </dialog>
  )
}

export default DeleteModal