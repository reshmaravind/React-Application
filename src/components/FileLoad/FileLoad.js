import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const FileLoad = ({ show, handleClose, handleUpload }) => {
    const [file, setFile] = useState(null);
    const [label, setLabel] = useState('');


    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleLabelChange = (event) => {
        setLabel(event.target.value);
    };

    const handleUploadClick = () => {
        if (file && label) {
            handleUpload(label, file);
            handleClose();
            setLabel('');
            setFile(null);
        } else {
            alert('Please provide both a label and select a file.');
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Upload</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="labelFor">
                        <Form.Label>Label</Form.Label>
                        <Form.Control type="text" onChange={handleLabelChange} />
                    </Form.Group>
                    <Form.Group controlId="fileFor">
                        <Form.Label>File</Form.Label>
                        <Form.Control type="file" onChange={handleFileChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleUploadClick}>
                    Upload
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default FileLoad;