import React, {createContext, useContext, useEffect, useState} from 'react';
import { openDB } from 'idb';
import {IDBPDatabase} from "idb/build/entry";

interface State {
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

interface EditableNote {
    title: string;
    body: string;
}

interface Note extends EditableNote{
    id: number;
    createdOn: number;
}

export const DBContext = createContext<State | undefined>(undefined);

// To fix useContext default value
export const useDbContext = () => {
    const dbContext = useContext(DBContext);
    if (!dbContext)
        throw new Error(
            'No DBContext.Provider found when calling useDbContext.'
        );
    return dbContext;
};

function useToggle(initialValue: boolean): [boolean, () => void] {
    const [value, setValue] = useState<boolean>(initialValue);
    const toggle = () => {
        setValue(!value);
    }
    return [value, toggle];
}

export const DBProvider = (props: any) => {
    const [isAdding, setIsAdding] = useToggle(false);
    const [isEditing, setIsEditing] = useToggle(false);
    const [activeNote, setActiveNote] = useState<Note | null>(null);
    const [processingNote, setProcessingNote] = useState<EditableNote >({title:"", body:""});
    const [showModal, setShowModal] = useState(false);
    const [notes, setNotes] = useState<Note[]>([]);
    const [notesLoaded, setNotesLoaded] = useToggle(false);
    const [searchInput, setSearchInput] = useState('')
    const [db, setDb] = useState<IDBPDatabase | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        connectToDb();

        async function connectToDb() {
            try {
                const db = await openDB('notesDb', 2, {
                        upgrade(db) {
                            db.createObjectStore('notes', {keyPath: 'id', autoIncrement:true});
                        }
                    }
                );
                setDb(db);
            } catch(err) {
                console.log("Db connection error");
                // @ts-ignore
                setError(err.message);
            }

        }
    }, []);

    useEffect(() => {
        if(db !== null) getNotes();
    }, [db])

    async function getNotes() {
        let tx = db!.transaction('notes');
        let notesStore = tx.objectStore('notes');
        let notes = await notesStore.getAll();
        setNotes(notes);
        setActiveNote(notes[0]);
        setNotesLoaded();
    }

    const filterNotes = function () {
        return notes.filter(function (note) {
                return note.body.toLowerCase().includes(searchInput) || note.title.toLowerCase().includes(searchInput)
            })
    }

    const addNote = async function () {
        if(isAdding) {
            let tx = db!.transaction('notes', 'readwrite');
            try {
                const noteId = await tx.objectStore('notes').add({
                    title: processingNote.title,
                    body: processingNote.body,
                    createdOn: Date.now()
                });
                const createdNote: Note = await tx.objectStore('notes').get(noteId)
                setNotes((prevNotes) => [...prevNotes, {
                    ...createdNote
                }]);
                setActiveNote(createdNote);
            } catch(err) {
                console.log("Add to db error")
                // @ts-ignore
                setError(err.message);
            }
        } else {
            setProcessingNote({
                title: "",
                body: "",
            });
            setActiveNote(null);
        }
        setIsAdding();
    }

    const updateNote = async function () {
        if(isEditing) {
            let tx = db!.transaction('notes', 'readwrite');
            try {
                await tx.objectStore('notes').put({
                    title: processingNote.title,
                    body: processingNote.body,
                    id: activeNote!.id
                });
                const index = notes.findIndex((note) => note.id === activeNote!.id);
                setNotes(notes => {
                    const newNotes = [...notes];
                    newNotes[index].title = processingNote.title;
                    newNotes[index].body = processingNote.body;
                    return newNotes;
                })
            } catch(err) {
                console.log("Update db error")
                // @ts-ignore
                setError(err.message);
            }
        } else {
            setProcessingNote({
                title: activeNote!.title,
                body: activeNote!.body,
            });
        }
        setIsEditing();
    }


    const deleteNote = () => {
        let tx = db!.transaction('notes', 'readwrite');
        try {
            const notesStore = tx.objectStore('notes');
            notesStore.delete(activeNote!.id);
            const newNotes = notes.filter(note => note.id !== activeNote!.id);
            setNotes(newNotes);
            setActiveNote(newNotes[0]);
        } catch(err) {
            console.log("Delete from db error")
            // @ts-ignore
            setError(err.message);
        }
    }

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
        deleteNote,
        showModal,
        setShowModal,
        setSearchInput,
        notesLoaded,
        error
    }

    return (
        <DBContext.Provider value={value}>
            {props.children}
        </DBContext.Provider>
    ); 
}