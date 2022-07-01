import React from 'react';
import {NoteForm} from "./NoteForm";
import { useDbContext} from "./DBProvider";

function WorkSpace() {
    const {activeNote, isAdding, isEditing} = useDbContext();
    if (isAdding || isEditing) {
        return <NoteForm />
    }
    if(!activeNote) return <div>Loading...</div>
    return (
        <div>
            <h3>{activeNote.title}</h3>
            <p>{activeNote.body}</p>
        </div>

    )
}

export default WorkSpace;