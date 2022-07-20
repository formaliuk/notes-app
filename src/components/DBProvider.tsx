import React, { createContext, useEffect, useState } from "react";
import { openDB } from "idb";
import { IDBPDatabase } from "idb/build/entry";
import { useToggle } from "../hooks/useToggle";
import { State, EditableNote, Note } from "../types/data";

export const DBContext = createContext<State | undefined>(undefined);

export const DBProvider = ({ children }: any) => {
  const [isAdding, setIsAdding] = useToggle(false);
  const [isEditing, setIsEditing] = useToggle(false);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [processingNote, setProcessingNote] = useState<EditableNote>({
    title: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [notesLoaded, setNotesLoaded] = useToggle(false);
  const [searchInput, setSearchInput] = useState("");
  const [db, setDb] = useState<IDBPDatabase | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    connectToDb();

    async function connectToDb() {
      try {
        const db = await openDB("notesDb", 2, {
          upgrade(db) {
            db.createObjectStore("notes", {
              keyPath: "id",
              autoIncrement: true,
            });
          },
        });
        setDb(db);
      } catch (err) {
        console.log("Db connection error");
        // @ts-ignore
        setError(err.message);
      }
    }
  }, []);

  useEffect(() => {
    if (db !== null) getNotes();
  }, [db]);

  const getNotes = async function () {
    const tx = db!.transaction("notes");
    const notesStore = tx.objectStore("notes");
    const notes = await notesStore.getAll();
    const sortedNotes = notes.sort((a, b) => b.createdOn - a.createdOn);
    setNotes(sortedNotes);
    setActiveNote(notes[0]);
    setNotesLoaded();
  };

  const filterNotes = function () {
    return notes.filter(function (note) {
      return note.title.toLowerCase().includes(searchInput);
    });
  };

  const addNote = async function () {
    if (isAdding) {
      const tx = db!.transaction("notes", "readwrite");
      try {
        const noteId = await tx.objectStore("notes").add({
          title: processingNote.title,
          createdOn: Date.now(),
        });
        const createdNote: Note = await tx.objectStore("notes").get(noteId);
        setNotes((prevNotes) => [
          {
            ...createdNote,
          },
          ...prevNotes,
        ]);
        setActiveNote(createdNote);
      } catch (err) {
        console.log("Add to db error");
        // @ts-ignore
        setError(err.message);
      }
    } else {
      setProcessingNote({
        title: "",
      });
      setActiveNote(null);
    }
    setIsAdding();
  };

  const updateNote = async function () {
    if (isEditing) {
      const tx = db!.transaction("notes", "readwrite");
      try {
        await tx.objectStore("notes").put({
          title: processingNote.title,
          id: activeNote!.id,
          createdOn: activeNote?.createdOn,
        });
        const index = notes.findIndex((note) => note.id === activeNote!.id);
        setNotes((notes) => {
          const newNotes = [...notes];
          newNotes[index].title = processingNote.title;
          return newNotes;
        });
      } catch (err) {
        console.log("Update db error");
        // @ts-ignore
        setError(err.message);
      }
    } else {
      setProcessingNote({
        title: activeNote!.title,
      });
    }
    setIsEditing();
  };

  const periodicUpdateNote = async function () {
    if (isEditing) {
      const tx = db!.transaction("notes", "readwrite");
      try {
        await tx.objectStore("notes").put({
          title: processingNote.title,
          id: activeNote!.id,
          createdOn: activeNote?.createdOn,
        });
      } catch (err) {
        console.log("Update db error");
        // @ts-ignore
        setError(err.message);
      }
    }
  };

  const deleteNote = async function () {
    const tx = db!.transaction("notes", "readwrite");
    try {
      const notesStore = tx.objectStore("notes");
      notesStore.delete(activeNote!.id);
      const newNotes = notes.filter((note) => note.id !== activeNote!.id);
      setNotes(newNotes);
      setActiveNote(newNotes[0]);
    } catch (err) {
      console.log("Delete from db error");
      // @ts-ignore
      setError(err.message);
    }
  };

  const value: State = {
    isAdding,
    isEditing,
    setIsAdding,
    setIsEditing,
    activeNote,
    setActiveNote,
    processingNote,
    setProcessingNote,
    notes,
    filterNotes,
    addNote,
    updateNote,
    periodicUpdateNote,
    deleteNote,
    showModal,
    setShowModal,
    setSearchInput,
    notesLoaded,
    error,
  };

  return <DBContext.Provider value={value}>{children}</DBContext.Provider>;
};
