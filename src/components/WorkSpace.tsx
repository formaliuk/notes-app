import React from "react";
import { NoteForm } from "./NoteForm";
import { useDbContext } from "../hooks/useDbContext";
import { Loader } from "./Loader";
import ReactMarkdown from 'react-markdown'


function WorkSpace() {
  const { activeNote, isAdding, isEditing, notesLoaded } = useDbContext();
  if (!notesLoaded) return <Loader />;
  if (isAdding || isEditing) {
    return <NoteForm />;
  }

  if (!activeNote)
    return <h5 className="text-light p-5">You can add a note here</h5>;
  else if (activeNote.title === '')
    return <p className="text-secondary note">Empty note</p>
  return (
    <ReactMarkdown children={activeNote.title} className="text-light note"/>
  );
}

export { WorkSpace };
