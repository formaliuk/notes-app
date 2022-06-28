import React from 'react';
import {Form} from "react-bootstrap";

function WorkSpace() {
    return (
        <div className="mt-4 me-2">
            <Form className="w-100 min-vh-100">
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label >Type your note</Form.Label>
                    <Form.Control as="textarea" name="address" />
                </Form.Group>
            </Form>
        </div>
    );
}

export default WorkSpace;