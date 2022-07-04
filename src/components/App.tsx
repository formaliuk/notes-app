import React, {useContext, useState} from 'react';
import {Container, Row, Col, Button} from "react-bootstrap";
import SideBar from "./SideBar";
import Header from "./Header";
import WorkSpace from "./WorkSpace";
import {DeletingModal} from "./DeletingModal";

function App() {

    return (
        <div className="App border-2">
            <Container className="col-md-8">
                <Row>
                    <Col>
                        <Header/>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <SideBar/>
                    </Col>
                    <Col sm={8}>
                        <WorkSpace/>
                    </Col>
                </Row>
            </Container>
            <DeletingModal/>
        </div>
  );
}

export default App;
