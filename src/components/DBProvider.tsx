import React, {createContext, useState} from 'react';

interface State {
    activeNote: Note | null;
    setActiveNote:  React.Dispatch<React.SetStateAction<Note | null>>,
    notes: Note[];
    addNote: (title: string, body: string) => void;
    deleteNote: (id: number) => void;
}

interface Note {
    title: string;
    body: string;
    id:number
}

export const DBContext = createContext<State>({
    activeNote: null,
    setActiveNote: () => {},
    notes: [],
    addNote: () => {},
    deleteNote: () => {}
});


export const DBProvider = (props: any) => {
    const [activeNote, setActiveNote] = useState<Note | null>(null);
    const [notes, setNotes] = useState<Note[]>([
        {
            title: 'note1',
            body: 'this is a body text of a note1',
            id: 1
        },
        {
            title: 'note2',
            body: 'this is a body text of a note2',
            id: 2
        },
        {
            title: 'note3',
            body: 'this is a body text of a note3',
            id: 3
        }
    ]);

    const addNote = function (title: string, body: string) {
        setNotes((prevNotes) => [...prevNotes, {title, body, id: Date.now()}]);
    }

    const deleteNote = (id: number) => {
        setNotes(notes.filter(note => note.id !== id));
    }

    const value: State = {
        activeNote,
        setActiveNote,
        notes,
        addNote,
        deleteNote,
    }

    return (
        <DBContext.Provider value={value}>
            {props.children}
        </DBContext.Provider>
    ); 
}