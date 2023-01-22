import React, { useRef } from "react";
import { useQuery } from "react-query";
interface UserType {
    id: string;
    name: string;
    status: boolean;
    email: string;
    last_login: string;
    role: string;
    img: string;
}

const Modal:React.FC<{func: (e: React.SyntheticEvent) => void, modal: React.RefObject<HTMLDialogElement>}> = ({func, modal}) => {

    return (
        <dialog ref={modal}>
            <p onClick={()=> modal?.current?.close()}>X</p>
            <form onSubmit={func}>
                <input id="Id" name="Id" type="text" className="hidden"/>
                <label htmlFor="Name">Name</label>
                <input id="Name" name="Name" type="text" />
                <label htmlFor="Email">Email</label>
                <input id="Email" name="Email" type="email" />
                <label htmlFor="Status">Status</label>
                <input id="Status" name="Status" type="checkbox" />
                <label htmlFor="Role">Role</label>
                <input id="Role" name="Role" type="text" />
                <button type="submit">Submit</button>
            </form>
        </dialog>
    );
};

export default Modal;
