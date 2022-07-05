import React from 'react';
import {Container, Row, Col} from "react-bootstrap";
import SideBar from "./SideBar";
import Header from "./Header";
import WorkSpace from "./WorkSpace";
import {DeletingModal} from "./DeletingModal";
import {useDbContext} from "./DBProvider";

function App() {
    const {
        error
    } = useDbContext();

    if(error) return <div>Error occurred. {error}</div>

    return (
        <div className="App border-2">
            <Container className="col-md-8">
                <Row>
                    <Col>
                        <Header/>
                    </Col>
                </Row>
                <Row className="pt-2">
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
