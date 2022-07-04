import React, {createContext, useContext, useEffect, useState} from 'react';

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
}

interface EditableNote {
    title: string;
    body: string;
}

interface Note extends EditableNote{
    id:number;
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

const initialState = [
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
]

export const DBProvider = (props: any) => {
    const [isAdding, setIsAdding] = useToggle(false);
    const [isEditing, setIsEditing] = useToggle(false);
    const [activeNote, setActiveNote] = useState<Note | null>(null);
    const [processingNote, setProcessingNote] = useState<EditableNote >({title:"", body:""});
    const [showModal, setShowModal] = useState(false);
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
    const [searchInput, setSearchInput] = useState('')

    useEffect(() => {
        setActiveNote(notes[0]);
    }, [])

    const filterNotes = function () {
        return notes.filter(function (note) {
                return note.body.toLowerCase().includes(searchInput) || note.title.toLowerCase().includes(searchInput)
            })
    }

    const addNote = function () {
        if(isAdding) {
            setNotes((prevNotes) => [...prevNotes, {
                title: processingNote.title,
                body: processingNote.body,
                id: Date.now()
            }]);
        } else {
            setProcessingNote({
                title: "",
                body: "",
            });
        }
        setIsAdding();
        setActiveNote(null);
    }

    const updateNote = function () {
        if(isEditing) {
            const index = notes.findIndex((note) => note.id === activeNote!.id);
            setNotes(notes => {
                const newNotes = [...notes];
                newNotes[index].title = processingNote.title;
                newNotes[index].body = processingNote.body;
                return newNotes;
            })
        } else {
            setProcessingNote({
                title: activeNote!.title,
                body: activeNote!.body,
            });
        }
        setIsEditing();
    }


    const deleteNote = () => {
        const newNotes = notes.filter(note => note.id !== activeNote!.id);
        setNotes(newNotes);
        setActiveNote(newNotes[0]);
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
    }

    return (
        <DBContext.Provider value={value}>
            {props.children}
        </DBContext.Provider>
    ); 
}