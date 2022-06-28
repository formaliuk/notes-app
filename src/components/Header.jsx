import React from 'react';
import {Button} from "react-bootstrap";
import SearchBox from "./SearchBox";

function Header() {
    return (
        <div className="d-flex flex-row m-2">
            <h3 className="me-auto bg-warning rounded-1 p-1">Notes App</h3>
            <Button className="me-2 h1 align-self-center" variant="primary" size={"sm"}>Create</Button>
            <Button className="me-2 h1 align-self-center" variant="secondary" size={"sm"}>Edit</Button>
            <Button className="me-2 h1 align-self-center" variant="danger" size={"sm"}>Delete</Button>
            <SearchBox />
        </div>
    );
}

export default Header;