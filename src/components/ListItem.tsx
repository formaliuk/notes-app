import React from "react";
import { Card } from "react-bootstrap";
import { ListItemProps } from "../types/data";

function ListItem({ title, body, isActive, createdOn }: ListItemProps) {
  return (
    <Card
      className={
        isActive
          ? "bg-dark border-3 border-warning mb-2 mx-2"
          : "bg-dark mb-2 mx-2"
      }
    >
      <Card.Body className="text-light">
        <Card.Title>{title}</Card.Title>
        <Card.Text>{body.substring(0, 50)}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">
          Created {new Date(createdOn).toLocaleDateString()}
        </small>
      </Card.Footer>
    </Card>
  );
}

export { ListItem };
