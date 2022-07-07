import React from "react";
import { ListItem } from "./ListItem";
import { useDbContext } from "../hooks/useDbContext";
import { Note } from "../types/data";

function SideBar() {
  const {
    setActiveNote,
    activeNote,
    processingNote,
    isEditing,
    isAdding,
    filterNotes,
  } = useDbContext();

  const handleClick = (note: Note) => {
    if (!isEditing && !isAdding) setActiveNote(note);
  };

  return (
    <ul>
      {filterNotes().map((note) => (
        <li onClick={() => handleClick(note)} key={note.id}>
          <ListItem
            isActive={note.id === activeNote?.id}
            title={
              note.id === activeNote?.id && isEditing
                ? processingNote.title
                : note.title
            }
            body={
              note.id === activeNote?.id && isEditing
                ? processingNote.body
                : note.body
            }
            createdOn={note.createdOn}
          />
        </li>
      ))}
    </ul>
  );
}

export { SideBar };
