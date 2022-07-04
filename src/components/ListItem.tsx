import React from 'react';
import {Card} from "react-bootstrap";

interface ListItemProps {
    title: string;
    body: string;
    isActive: boolean;
}


function ListItem({title, body, isActive}: ListItemProps) {
    return (
        <Card className={isActive ? "bg-dark border-3 border-warning m-2" : "bg-dark m-2"}>
            <Card.Body className="text-light">
                <Card.Title>{title}</Card.Title>
                <Card.Text>{body.substring(0, 55)}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">Created {new Date().toLocaleDateString()}</small>
            </Card.Footer>
        </Card>
    );
}

export default ListItem;