import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import EditUser from './../EditUser/EditUser';
import DeleteModal from './../DeleteModal/DeleteModal';
import Home from '../Home/Home';
import FileLoad from './../FileLoad/FileLoad';
import './ManageDocument.css';

const ManageDocument = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [salesToDelete, setSalesToDelete] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [salesToEdit, setSalesToEdit] = useState(null);
    const [salesList, setSalesList] = useState([]);

    useEffect(() => {
        const storedSalesList = localStorage.getItem('salesList');
        if (storedSalesList) {
            setSalesList(JSON.parse(storedSalesList));
        }
    }, []);

    const handleEdit = (sales) => {
        setSalesToEdit(sales);
        setShowEditModal(true);
    };

    const handleSave = (editedSales) => {
        const updatedSalesList = salesList.map(sales =>
            sales.id === editedSales.id ? editedSales : sales
        );
        setSalesList(updatedSalesList);
        setShowEditModal(false);
        localStorage.setItem('salesList', JSON.stringify(updatedSalesList));
    };

    const handleDelete = (sales) => {
        const updatedSalesList = salesList.filter(item => item.id !== sales.id);
        setSalesList(updatedSalesList);
        setShowDeleteModal(false);
        localStorage.setItem('salesList', JSON.stringify(updatedSalesList));
    };

    const handleFileUpload = (label, file) => {
        const newSale = {
            id: Math.random(),
            label: label,
            fileName: file.name
        };
        setSalesList([...salesList, newSale]);
        localStorage.setItem('salesList', JSON.stringify([...salesList, newSale])); // Save updated data to local storage
    };

    return (
        <div>
            <Home />
            <Container className="mt-4">
                <div className="header-des">
                    <h3>My Uploads</h3>
                    <Button variant="secondary" onClick={() => setShowUploadModal(true)}>Upload File</Button>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Label</th>
                            <th>File Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salesList.map(sale => (
                            <tr key={sale.id}>
                                <td>{sale.label}</td>
                                <td>{sale.fileName}</td>
                                <td>
                                    <Button variant="success" size="sm" onClick={() => handleEdit(sale)}>Edit</Button>{' '}
                                    <Button variant="primary" size="sm" onClick={() => { setSalesToDelete(sale); setShowDeleteModal(true); }}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </Container>
            <FileLoad
                show={showUploadModal}
                handleClose={() => setShowUploadModal(false)}
                handleUpload={handleFileUpload}
            />
            <EditUser
                show={showEditModal}
                handleClose={() => setShowEditModal(false)}
                user={salesToEdit}
                title='Edit Uploads'
                label_1='Label'
                label_2='File Name'
                handleSave={handleSave}
                isDoc={true}
            />
            <DeleteModal
                show={showDeleteModal}
                title="Confirm File Deletion"
                content="Are you sure you want to delete this document?"
                handleClose={() => setShowDeleteModal(false)}
                handleDelete={() => handleDelete(salesToDelete)}
            />
        </div>
    );
};

export default ManageDocument;