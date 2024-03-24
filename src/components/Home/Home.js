import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const showUserTable = () => {
        navigate('/userMgmt');
    };

    const showDocuments = () => {
        navigate('/docMgmt');
    };

    const logOutFunc = () => {
        localStorage.removeItem('loggedUser');
        navigate('/logout');
    };
    const showGroupChat = () => {
        navigate('/groupChat');
    };

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#">My User Management App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link onClick={showGroupChat}>Group Chat</Nav.Link>
                            <Nav.Link onClick={showUserTable}>Manage User</Nav.Link>
                            <Nav.Link onClick={showDocuments}>Manage Documents</Nav.Link>
                            <Nav.Link onClick={logOutFunc}>Logout</Nav.Link>
                            <Nav.Link>Welcome {JSON.parse(localStorage.getItem("loggedUser")).email} !</Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Home;
