import React from 'react';
import {NoteForm} from "./NoteForm";
import {useDbContext} from "./DBProvider";
import {Spinner} from "react-bootstrap";

function WorkSpace() {
    const {activeNote, isAdding, isEditing} = useDbContext();
    if (isAdding || isEditing) {
        return <NoteForm />
    }
    if(!activeNote) return <h5 className="text-light">Please select a note</h5>
    // if(!activeNote) return <Spinner animation="border" role="status" variant="warning">
    //     <span className="visually-hidden">Loading...</span>
    // </Spinner>
    return (
        <div className="text-light">
            <h3>{activeNote.title}</h3>
            <p>{activeNote.body}</p>
        </div>

    )
}

export default WorkSpace;