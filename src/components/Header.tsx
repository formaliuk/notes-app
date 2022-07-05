import React from 'react';
import {Button} from "react-bootstrap";
import SearchBox from "./SearchBox";
import {useDbContext} from "./DBProvider";

function Header() {
    const {
        isAdding,
        isEditing,
        addNote,
        setShowModal,
        activeNote,
        updateNote,
        notesLoaded
    } = useDbContext();
    return (
        <div className="d-flex flex-row m-2">
            <h3 className="me-auto bg-warning rounded-1 p-1">Notes App</h3>
            {
                notesLoaded &&
                    <>
                        <Button
                            onClick={addNote}
                            className={isEditing ? "me-2 h1 align-self-center disabled" : "me-2 h1 align-self-center"}
                            variant={isAdding ? "success" : "primary"}
                            size={"sm"}
                        >
                            {isAdding ? "Submit" : "Add new note" }
                        </Button>
                        {
                            activeNote && <>
                                <Button
                                    onClick={updateNote}
                                    className="me-2 h1 align-self-center"
                                    variant={isEditing ? "success" : "secondary"}
                                    size={"sm"}
                                >
                                    {isEditing ? "Confirm" : "Edit" }
                                </Button>
                                <Button
                                    onClick={() => setShowModal(true)}
                                    className={isEditing ? "me-2 h1 align-self-center disabled" : "me-2 h1 align-self-center"}
                                    variant="danger"
                                    size={"sm"}
                                >
                                    Delete
                                </Button>
                            </>
                        }
                        <SearchBox />
                    </>
            }
        </div>
    );
}

export default Header;