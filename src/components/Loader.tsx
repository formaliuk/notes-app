import React from "react";
import {Spinner} from "react-bootstrap";

function Loader() {
  return (
    <Spinner animation="border" role="status" variant="warning" className="mt-2 ms-1">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export {Loader};
