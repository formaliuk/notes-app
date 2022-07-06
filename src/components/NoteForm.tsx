import React from 'react';
import {useDbContext} from "../hooks/useDbContext";

function NoteForm() {
  const {processingNote, setProcessingNote} = useDbContext();

  return (
    <>
      <form>
        <div className="form-group mt-1 me-2">
          <label htmlFor="exampleFormControlInput1" className="text-light">Note header</label>
          <input
            value={processingNote.title}
            onChange={(e) => setProcessingNote({title: e.target.value, body: processingNote.body})}
            type="text"
            className="form-control bg-dark text-light border-secondary"
            id="exampleFormControlInput1"
            placeholder="Create a heading for your note"
          />
        </div>
        <div className="form-group mt-3 me-2">
          <label htmlFor="exampleFormControlTextarea1" className="text-light" >Note body</label>
          <textarea
            value={processingNote.body}
            onChange={(e) => setProcessingNote({title: processingNote.title, body: e.target.value})}
            className="form-control bg-dark text-light border-secondary"
            id="exampleFormControlTextarea1"
            style={{height: '300px'}}
          />
        </div>
      </form>
    </>
  );
}

export {NoteForm}