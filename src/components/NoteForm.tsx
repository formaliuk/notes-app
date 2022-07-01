import React, {useEffect, useState} from 'react';
import { useDbContext} from "./DBProvider";

// interface NoteFormProps {
//     submitHandler: () => void,
//     inputHandler?: () => void,
// }


function NoteForm() {
    const {processingNote, setProcessingNote, isAdding, activeNote} = useDbContext();

    useEffect(() => {
        const initialProcessingNote = {
            title: isAdding ? "" : activeNote!.title,
            body: isAdding ? "" : activeNote!.body,
        }
        setProcessingNote(initialProcessingNote);
    }, []);

    // const addNewNote = (e: React.SyntheticEvent): void => {
    //     e.preventDefault()
    //     context.addNote('note4', 'this is a body text of a note4')
    // }

    return (
        <>
            <form>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Note header</label>
                    <input onChange={(e) => setProcessingNote({title: e.target.value, body: processingNote.body})} type="text" className="form-control" id="exampleFormControlInput1"
                           placeholder="Create a heading for your note" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Note body</label>
                    <textarea onChange={(e) => setProcessingNote({title: processingNote.title, body: e.target.value})} className="form-control" id="exampleFormControlTextarea1" />
                </div>
            </form>
        </>
    );
}

export {NoteForm}