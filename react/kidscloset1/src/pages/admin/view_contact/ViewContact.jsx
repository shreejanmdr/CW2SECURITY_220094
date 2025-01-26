import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllContacts } from '../../../apis/Api';
import './ViewContact.css';

const ViewContact = () => {
    const [contacts, setContacts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllContacts().then(response => {
            setContacts(response.data.contacts);
        }).catch(error => {
            console.error('Failed to fetch contacts:', error);
            toast.error("Failed to fetch contacts: " + (error.response?.data.message || "Server error"));
        });
    }, []);

    return (
        <div className="view-contact container mt-4 vh-100 overflow-auto" style={{ marginLeft: '250px' }}>
            <h1 className="view-contact-header text-center mb-4">Customer Messages</h1>
            <div className="view-table-container">
                <table className="table mt-4 table-hover table-striped table-bordered table-responsive table-blue text-center shadow w-100 overflow-auto">
                    <thead className="table-blue">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th>Contact Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map(contact => (
                            <tr key={contact._id}>
                                <td>{contact.firstName} {contact.lastName}</td>
                                <td>{contact.email}</td>
                                <td>{contact.message}</td>
                                <td>{contact.createdAt ? new Date(contact.createdAt).toLocaleDateString() : 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button onClick={() => navigate('/admin/dashboard')} className="btn btn-primary rounded-pill mt-4">Back to Dashboard</button>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={true} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
};

export default ViewContact;
