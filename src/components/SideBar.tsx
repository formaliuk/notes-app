import React, {useContext, useState} from 'react';
import ListItem from "./ListItem";
import {DBContext} from "./DBProvider";

function SideBar() {
    const {setActiveNote, activeNote, notes} = useContext(DBContext)

    console.log("Here", activeNote)
    console.log("All notes", notes)
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
                                title={note.title}
                                body={note.body}
                            />
                        </li>))
            }
        </ul>
    );
}

export default SideBar;