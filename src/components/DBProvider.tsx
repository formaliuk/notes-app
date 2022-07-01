import React, {createContext, useContext, useEffect, useState} from 'react';

interface State {
    isAdding: boolean;
    isEditing: boolean;
    setIsAdding: () => void,
    setIsEditing: () => void,
    activeNote: Note | null;
    setActiveNote:  React.Dispatch<React.SetStateAction<Note | null>>,
    processingNote: EditableNote,
    setProcessingNote:  React.Dispatch<React.SetStateAction<EditableNote>>,
    notes: Note[];
    addNote: (title: string, body: string) => void;
    deleteNote: (id: number) => void;
}

interface EditableNote {
    title: string;
    body: string;
}

interface Note extends EditableNote{
    id:number
}

export const DBContext = createContext<State | undefined>(undefined);

// just to shut up ts
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

    useEffect(() => {
        setActiveNote(notes[0]);
    }, [])

    const addNote = function (title: string, body: string) {
        setNotes((prevNotes) => [...prevNotes, {title, body, id: Date.now()}]);
    }

    const deleteNote = (id: number) => {
        setNotes(notes.filter(note => note.id !== id));
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
        addNote,
        deleteNote,
    }

    return (
        <DBContext.Provider value={value}>
            {props.children}
        </DBContext.Provider>
    ); 
}