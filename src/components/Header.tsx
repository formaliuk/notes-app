import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { SearchBox } from "./SearchBox";
import { useDbContext } from "../hooks/useDbContext";
import { Cheatsheet } from "./Cheatsheet";

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

  // @ts-ignore
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
                className={isEditing ? "me-2 disabled" : "me-2"}
                variant="secondary"
                size={"sm"}
              >
                Edit
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
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip id="button-tooltip-2">
                <Cheatsheet />
              </Tooltip>
            }
          >
            <Button className="text-light me-2" variant="outline-secondary">
              ?
            </Button>
          </OverlayTrigger>
          <SearchBox />
        </>
      )}
    </div>
  );
}

export { Header };
