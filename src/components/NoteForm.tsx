import React from "react";
import { useDbContext } from "../hooks/useDbContext";

function NoteForm() {
  const { processingNote, setProcessingNote, updateNote, periodicUpdateNote } =
    useDbContext();

  let typingTimer: any;
  const doneTypingInterval = 3000;

  const handleKeyDown = () => {
    clearTimeout(typingTimer);
  };

  const handleKeyUp = () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(periodicUpdateNote, doneTypingInterval);
  };

  const handleBlur = function (e: any) {
    setProcessingNote({
      title: e.target.value,
    });
    updateNote();
  };

  return (
    <>
      <form>
        <div className="form-group mt-1 me-2">
          <label htmlFor="exampleFormControlInput1" className="text-light">
            Note with Markdown syntax
          </label>
          <textarea
            value={processingNote.title}
            onChange={(e) => setProcessingNote({ title: e.target.value })}
            onKeyUp={handleKeyUp}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className="form-control bg-dark text-light border-secondary"
            id="exampleFormControlInput1"
            placeholder="Create a heading for your note"
          />
        </div>
      </form>
    </>
  );
}

export { NoteForm };
