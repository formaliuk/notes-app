import React from 'react';
import {Button} from "react-bootstrap";
import SearchBox from "./SearchBox";
import {useDbContext} from "./DBProvider";

function Header() {
    const {
        isAdding,
        addNote,
        setShowModal,
        activeNote,
        updateNote
    } = useDbContext();

    return (
        <div className="d-flex flex-row m-2">
            <h3 className="me-auto bg-warning rounded-1 p-1">Notes App</h3>
            <Button onClick={addNote} className="me-2 h1 align-self-center" variant={isAdding ? "success" : "primary"} size={"sm"}>{isAdding ? "Submit" : "Add new note" }</Button>
            { activeNote &&
                <Button onClick={updateNote} className="me-2 h1 align-self-center" variant="secondary" size={"sm"}>Edit</Button>
            }
            <Button onClick={() => setShowModal(true)} className="me-2 h1 align-self-center" variant="danger" size={"sm"}>Delete</Button>
            <SearchBox />
        </div>
    );
}

export default Header;