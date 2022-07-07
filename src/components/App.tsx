import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { SideBar } from "./SideBar";
import { Header } from "./Header";
import { WorkSpace } from "./WorkSpace";
import { DeletingModal } from "./DeletingModal";
import { useDbContext } from "../hooks/useDbContext";
import logo from "../assets/images/logo.png";

function App() {
  const { error } = useDbContext();

  if (error) return <div>Error occurred. {error}</div>;

  return (
    <div className="App border-2">
      <Container className="col-md-8">
        <Row className="sticky-top pb-2 header">
          <Col sm={4}>
            <div className="bg-warning rounded-1 text-center mt-3 mx-2 px-2 d-flex justify-content-center">
              <img className="mt-1 me-auto" src={logo} alt="logo" />
              <h3 className="mt-2 me-auto">Notes App</h3>
            </div>
          </Col>
          <Col sm={8}>
            <Header />
          </Col>
        </Row>
        <Row className="mt-4 pt-3 content">
          <Col sm={4}>
            <SideBar />
          </Col>
          <Col sm={8}>
            <WorkSpace />
          </Col>
        </Row>
      </Container>
      <DeletingModal />
    </div>
  );
}

export { App };
