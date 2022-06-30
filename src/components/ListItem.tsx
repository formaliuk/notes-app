import React from 'react';
import {Card} from "react-bootstrap";

interface ListItemProps {
    title: string;
    body: string;
}

function ListItem({title, body}: ListItemProps) {
    return (
            <Card className="overflow-hidden pb-3" style={{ width: '18rem', maxHeight: '7.9rem'}}>
                <Card.Body className="mb-3">
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle className="text-muted mb-2">{new Date().toLocaleDateString()}</Card.Subtitle>
                    <Card.Text>{body}</Card.Text>
                </Card.Body>
            </Card>
    );
}

export default ListItem;