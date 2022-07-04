import React, {useEffect, useState} from 'react';
import { useDbContext} from "./DBProvider";

// interface NoteFormProps {
//     submitHandler: () => void,
//     inputHandler?: () => void,
// }


function NoteForm() {
    const {processingNote, setProcessingNote, isAdding, activeNote} = useDbContext();

    return (
        <>
            <form>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1" className="text-light">Note header</label>
                    <input value={processingNote.title} onChange={(e) => setProcessingNote({title: e.target.value, body: processingNote.body})} type="text" className="form-control bg-dark text-light" id="exampleFormControlInput1"
                           placeholder="Create a heading for your note" />
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="exampleFormControlTextarea1" className="text-light">Note body</label>
                    <textarea value={processingNote.body} onChange={(e) => setProcessingNote({title: processingNote.title, body: e.target.value})} className="form-control bg-dark text-light" id="exampleFormControlTextarea1" />
                </div>
            </form>
        </>
    );
}

export {NoteForm}