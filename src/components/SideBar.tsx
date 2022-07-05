import React from 'react';
import ListItem from "./ListItem";
import {useDbContext} from "./DBProvider";

function SideBar() {
    const {setActiveNote, activeNote, processingNote, isEditing, filterNotes} = useDbContext()
    return (
        <ul>
            {
                filterNotes()
                    .map(note => (
                        <li
                            onClick={() => setActiveNote(note)}
                            key={note.id}
                            style={{listStyle: 'none', marginLeft: '-32px'}}
                        >
                            <ListItem
                                isActive={note.id === activeNote?.id}
                                title={note.id === activeNote?.id && isEditing ? processingNote.title : note.title}
                                body={note.id === activeNote?.id && isEditing ? processingNote.body : note.body}
                            />
                        </li>))
            }
        </ul>
    );
}

export default SideBar;