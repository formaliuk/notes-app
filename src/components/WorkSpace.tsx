import React, {useContext} from 'react';
import {NoteForm} from "./NoteForm";
import {DBContext} from "./DBProvider";

function WorkSpace() {
    const {activeNote} = useContext(DBContext)
    if (!activeNote) {
        return <div>
            <NoteForm />
        </div>
    } else return (
        <div>
            <h3>{activeNote.title}</h3>
            <p>{activeNote.body}</p>
        </div>

    )
}

export default WorkSpace;