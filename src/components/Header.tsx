import React from 'react';
import {Button} from "react-bootstrap";
import SearchBox from "./SearchBox";
import {useDbContext} from "./DBProvider";

function Header() {
    const {isAdding, setIsAdding, setIsEditing, isEditing, setActiveNote, processingNote, addNote} = useDbContext();
    const addNoteChangeHandler = () => {
        setIsAdding();
        setActiveNote(null);
        if(isAdding) {
            addNote(processingNote.title, processingNote.body);
        }
    }

    const editNoteChangeHandler = () => {
        setIsEditing();
        if(isEditing) {
            console.log(isEditing) // add update
        }
    }
    return (
        <div className="d-flex flex-row m-2">
            <h3 className="me-auto bg-warning rounded-1 p-1">Notes App</h3>
            <Button onClick={addNoteChangeHandler} className="me-2 h1 align-self-center" variant="primary" size={"sm"}>{isAdding ? "Submit" : "Add new note" }</Button>
            <Button onClick={editNoteChangeHandler} className="me-2 h1 align-self-center" variant="secondary" size={"sm"}>Edit</Button>
            <Button className="me-2 h1 align-self-center" variant="danger" size={"sm"}>Delete</Button>
            <SearchBox />
        </div>
    );
}

export default Header;