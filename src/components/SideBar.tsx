import React from 'react';
import ListItem from "./ListItem";
import {Nav} from "react-bootstrap";

function SideBar() {
    return (
        <Nav defaultActiveKey="/home" variant="tabs" className="flex-column mt-4">
            <Nav.Link href="/home">
                <ListItem />
            </Nav.Link>
            <Nav.Link eventKey="link-1">
                <ListItem />
            </Nav.Link>
            <Nav.Link eventKey="link-2">
                <ListItem />
            </Nav.Link>
        </Nav>
    );
}

export default SideBar;