import React, {useContext, useState} from 'react';
import {Container, Row, Col} from "react-bootstrap";
import SideBar from "./SideBar";
import Header from "./Header";
import WorkSpace from "./WorkSpace";

function App() {
    return (
        <div className="App">
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
        </div>
  );
}

export default App;
