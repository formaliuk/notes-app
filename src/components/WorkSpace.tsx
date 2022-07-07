import React from "react";
import { NoteForm } from "./NoteForm";
import { useDbContext } from "../hooks/useDbContext";
import { Loader } from "./Loader";

function WorkSpace() {
  const { activeNote, isAdding, isEditing, notesLoaded } = useDbContext();
  if (!notesLoaded) return <Loader />;
  if (isAdding || isEditing) {
    return <NoteForm />;
  }

  if (!activeNote)
    return <h5 className="text-light p-5">You can add a note here</h5>;
  return (
    <div className="text-light note">
      <h4 className="fs-3">{activeNote.title}</h4>
      <p>{activeNote.body}</p>
    </div>
  );
}

export { WorkSpace };
