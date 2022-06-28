import React from 'react';
import {Card} from "react-bootstrap";

function ListItem() {
    return (
            <Card className="overflow-hidden pb-3" style={{ width: '18rem', maxHeight: '7.9rem'}}>
                <Card.Body className="mb-3">
                    <Card.Title>Card Title</Card.Title>
                    <Card.Subtitle className="text-muted mb-2">27.06.2022</Card.Subtitle>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content. lorem ipsum lorem ck example text to build on the card title and make up the bulk of
                        text to build on the card's content ipsum quick example text to build on the card title and make up the bulk of
                        example the card's content lorem ck example text to build on the card title and make up the bulk of
                        the card's content. lorem ipsum
                    </Card.Text>
                </Card.Body>
            </Card>
    );
}

export default ListItem;