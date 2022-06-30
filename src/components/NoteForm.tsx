import React, {useContext, useState} from 'react';
import {DBContext} from "./DBProvider";


function NoteForm() {
    // const [title, setTitle] = useState('');
    // const [body, setBody] = useState('');


    const context = useContext(DBContext);

    const addNewNote = (e: React.SyntheticEvent): void => {
        e.preventDefault()
        context.addNote('note4', 'this is a body text of a note4')
    }

    return (
        <>
            <form>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Note header</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1"
                           placeholder="Create a heading for your note" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Note body</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" />
                </div>
                <button onSubmit={addNewNote} type="submit" className="btn btn-primary mt-2">Create</button>
            </form>
        </>
    );
}

export {NoteForm}