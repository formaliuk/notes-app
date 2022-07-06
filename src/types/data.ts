import React from "react";

export interface EditableNote {
  title: string;
  body: string;
}

export interface Note extends EditableNote{
  id: number;
  createdOn: number;
}

export interface State {
  isAdding: boolean;
  isEditing: boolean;
  setIsAdding: () => void;
  setIsEditing: () => void;
  activeNote: Note | null;
  setActiveNote:  React.Dispatch<React.SetStateAction<Note | null>>;
  processingNote: EditableNote;
  setProcessingNote:  React.Dispatch<React.SetStateAction<EditableNote>>;
  notes: Note[];
  filterNotes: () => Note[];
  addNote: () => void;
  updateNote: () => void;
  deleteNote: () => void;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  notesLoaded: boolean;
  error: string | null;
}

export interface ListItemProps {
  title: string;
  body: string;
  isActive: boolean;
  createdOn: number;
}