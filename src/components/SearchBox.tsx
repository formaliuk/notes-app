import React, {SyntheticEvent} from 'react';
import {useDbContext} from "../hooks/useDbContext";

function SearchBox() {
  const {setSearchInput, activeNote, setActiveNote} = useDbContext();

  const inputHandler = (e: SyntheticEvent) => {
    if (activeNote) setActiveNote(null)
    // @ts-ignore
    setSearchInput(e.target.value)
  }

  return (
    <div>
      <div className="input-group">
        <input 
          onInput={inputHandler} 
          type="search" 
          className="form-control rounded bg-dark text-light border-secondary" 
          placeholder="Search" 
          aria-label="Search"
          aria-describedby="search-addon"
        />
      </div>
    </div>
  );
}

export {SearchBox};