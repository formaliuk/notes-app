import React from "react";
import { Button } from "react-bootstrap";
import { SearchBox } from "./SearchBox";
import { useDbContext } from "../hooks/useDbContext";

function Header() {
  const {
    isAdding,
    isEditing,
    addNote,
    setShowModal,
    activeNote,
    updateNote,
    notesLoaded,
  } = useDbContext();

  return (
    <div className="d-flex flex-row m-2 mt-3 justify-content-end">
      {notesLoaded && (
        <>
          <Button
            onClick={addNote}
            className={isEditing ? "me-2 disabled" : "me-2"}
            variant={isAdding ? "success" : "primary"}
            size={"sm"}
          >
            {isAdding ? "Submit" : "Add new note"}
          </Button>
          {activeNote && (
            <>
              <Button
                onClick={updateNote}
                className="me-2"
                variant={isEditing ? "success" : "secondary"}
                size={"sm"}
              >
                {isEditing ? "Confirm" : "Edit"}
              </Button>
              <Button
                onClick={() => setShowModal(true)}
                className={isEditing ? "me-2 disabled" : "me-2"}
                variant="danger"
                size={"sm"}
              >
                Delete
              </Button>
            </>
          )}
          <SearchBox />
        </>
      )}
    </div>
  );
}

export { Header };
