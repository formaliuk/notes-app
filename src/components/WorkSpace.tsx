import React from "react";
import { NoteForm } from "./NoteForm";
import { useDbContext } from "../hooks/useDbContext";
import { Loader } from "./Loader";
import ReactMarkdown from "react-markdown";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function WorkSpace() {
  const { activeNote, isAdding, isEditing, notesLoaded } = useDbContext();
  if (!notesLoaded) return <Loader />;
  if (isAdding || isEditing) {
    return <NoteForm />;
  }

  if (!activeNote)
    return (
      <OverlayTrigger
        placement="bottom"
        overlay={
          <Tooltip id="button-tooltip-2">
            You can use Markdown syntax to format your notes
          </Tooltip>
        }
      >
        <h5 className="text-light note">You can add a note here</h5>
      </OverlayTrigger>
    );
  else if (activeNote.title === "")
    return <p className="text-secondary note">Empty note</p>;
  return (
    <ReactMarkdown children={activeNote.title} className="text-light note" />
  );
}

export { WorkSpace };
