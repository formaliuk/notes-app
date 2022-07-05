import React from 'react';
import {NoteForm} from "./NoteForm";
import {useDbContext} from "./DBProvider";
import {Spinner} from "react-bootstrap";

function WorkSpace() {
    const {activeNote, isAdding, isEditing, notesLoaded} = useDbContext();
    if(!notesLoaded) return <Spinner animation="border" role="status" variant="warning">
        <span className="visually-hidden">Loading...</span>
    </Spinner>
    if (isAdding || isEditing) {
        return <NoteForm />
    }

    if (!activeNote) return <h5 className="text-light pt-1">You can add a note here</h5>
    return (
        <div className="text-light">
            <h3>{activeNote.title}</h3>
            <p>{activeNote.body}</p>
        </div>

    )
}

export default WorkSpace;