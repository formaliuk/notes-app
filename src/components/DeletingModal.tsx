import React from 'react';
import {Button, Modal} from "react-bootstrap";
import {useDbContext} from "../hooks/useDbContext";

function DeletingModal() {
  const {showModal, setShowModal, deleteNote} = useDbContext();
  const handleClose = () => setShowModal(false);

  const deleteNoteHandler = () => {
    handleClose();
    deleteNote();
  }

  return (
    <Modal
      size="sm"
      show={showModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Warning</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You are about to delete your note, are you sure?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={deleteNoteHandler} variant="danger">
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export {DeletingModal};