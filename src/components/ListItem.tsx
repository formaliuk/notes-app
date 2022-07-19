import React from "react";
import { Card } from "react-bootstrap";
import { ListItemProps } from "../types/data";
import ReactMarkdown from 'react-markdown'

function ListItem({ title, isActive, createdOn }: ListItemProps) {
  return (
    <Card
      className={
        isActive
          ? "bg-dark border-3 border-warning mb-2 mx-2"
          : "bg-dark mb-2 mx-2"
      }
    >
      <Card.Body className="text-light">
        <Card.Title>
          {title !== ''
              ? <ReactMarkdown children={title.substring(0, 50)} />
              : <div className="text-secondary">Empty note</div>
          }
        </Card.Title>
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
