import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditUser = ({ show, handleClose, user, title, label_1, label_2, handleSave, isDoc }) => {
    const [editedUser, setEditedUser] = useState({});
    const [originalUser, setOriginalUser] = useState({});



    useEffect(() => {
        if (user) {
            setEditedUser(user);
            setOriginalUser(user);
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleModalClose = () => {
        // Reset editedUser to originalUser when modal is closed without saving
        setEditedUser(originalUser);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>{label_1}</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" name={isDoc ? "label" : "name"} value={isDoc ? (editedUser.label || '') : (editedUser.name || '')} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>{label_2}</Form.Label>
                        <Form.Control type={isDoc ? "text" : "email"} placeholder="Enter email" name={isDoc ? "fileName" : "email"} value={isDoc ? (editedUser.fileName || '') : (editedUser.email || '')} onChange={handleChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleSave(editedUser)}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditUser;
