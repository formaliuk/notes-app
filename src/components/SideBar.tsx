import React from 'react';
import ListItem from "./ListItem";
import {useDbContext} from "./DBProvider";

function SideBar() {
    const {setActiveNote, activeNote, notes, processingNote, isEditing} = useDbContext()
    return (
        <ul>
            {
                notes
                    .map(note => (
                        <li
                            className={note.id === activeNote?.id ? 'active' : ''}
                            onClick={() => setActiveNote(note)}
                            key={note.id}
                            style={{listStyle: 'none'}}
                        >
                            <ListItem
                                title={note.id === activeNote?.id && isEditing ? processingNote.title : note.title}
                                body={note.id === activeNote?.id && isEditing ? processingNote.body : note.body}
                            />
                        </li>))
            }
        </ul>
    );
}

export default SideBar;