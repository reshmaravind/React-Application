import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import EditUser from './../EditUser/EditUser';
import DeleteModal from './../DeleteModal/DeleteModal';
import Home from '../Home/Home';


const UserMgmt = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const storedUsers = localStorage.getItem('userInfo');
        if (storedUsers) {
            const parsedUsers = JSON.parse(storedUsers);
            console.log('Parsed users:', parsedUsers);
            setUsers(parsedUsers);
        }
    }, []);

    const handleEdit = (user) => {
        setUserToEdit(user);
        setShowEditModal(true);
    };

    const handleSave = (editedUser) => {
        const updatedUsers = users.map(user =>
            user.id === editedUser.id ? editedUser : user
        );
        setUsers(updatedUsers);
        setShowEditModal(false);
        localStorage.setItem('userInfo', JSON.stringify(updatedUsers));
    };

    const handleDelete = (user) => {
        const userList = users.filter(item => item.email !== user.email);
        setUsers(userList);
        setShowDeleteModal(false);
        localStorage.setItem('users', JSON.stringify(userList));
    };

    return (
        <div>
            <Home></Home>
            <Container className="mt-4">
                <h3>Users</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Button variant="success" size="sm" onClick={() => handleEdit(user)}>Edit</Button>
                                    {user.email !== JSON.parse(localStorage.getItem("loggedUser")).email && (
                                        <Button variant="primary" size="sm" style={{ marginLeft: '10px' }} onClick={() => { setUserToDelete(user); setShowDeleteModal(true); }}>Delete</Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
            <EditUser
                show={showEditModal}
                handleClose={() => setShowEditModal(false)}
                user={userToEdit}
                title='Edit User Information'
                label_1='Name'
                label_2='Email'
                handleSave={handleSave}
                isDoc={false}
            />
            <DeleteModal
                show={showDeleteModal}
                title="Confirm User Deletion"
                content="Are you sure you want to delete this user?"
                handleClose={() => setShowDeleteModal(false)}
                handleDelete={() => handleDelete(userToDelete)}
            />
        </div>
    );
};

export default UserMgmt;
