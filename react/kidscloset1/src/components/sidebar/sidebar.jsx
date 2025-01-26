import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBox, FaServicestack, FaInfoCircle, FaPhone, FaSignOutAlt, FaHome, FaUserAlt, FaProductHunt, FaPenFancy, FaFileContract, FaInbox, FaPhoneAlt } from 'react-icons/fa'; // Importing icons
import './sidebar.css';

const Sidebar = ({ openAddProductModal }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <header className="bg-light shadow-sm p-3 h-100 sidebar">
            <div className="d-flex flex-column align-items-start">
                <div className="d-flex align-items-center gap-2 mb-0 sidebar-brand">
                    <Link to="/" className="d-flex align-items-center gap-2 text-dark text-decoration-none">
                        <span className="font-weight-bold h3 mb-0 ml-0">Closet</span>
                        <img
                            src="../assets/images/leaves.png"
                            alt="cart"
                            width="60"
                            height="40"
                            className="d-inline-block align-text-top"
                        />
                    </Link>
                </div>
                <div>________________________________</div>

                <nav className="d-flex flex-column align-items-start gap-2 w-100 mb-4 sidebar-links mt-3">
                <Link onClick={openAddProductModal} className="text-dark text-decoration-none w-100 sidebar-link" 
                        data-bs-target="#exampleModal" data-bs-toggle="modal">
                        <FaPenFancy className="me-2" /> Add Product
                    </Link>
                    <Link to="/" className="text-dark text-decoration-none w-100 sidebar-link">
                        <FaBox className="me-2" /> View Products
                    </Link>
                    {/* <Link to="/view users" className="text-dark text-decoration-none w-100 sidebar-link">
                        <FaUserAlt className="me-2" /> View Users
                    </Link> */}
                    {/* <Link to="/about" className="text-dark text-decoration-none w-100 sidebar-link">
                        <FaInfoCircle className="me-2" /> Order Status
                    </Link> */}
                    <Link to="/contactus" className="text-dark text-decoration-none w-100 sidebar-link">
                        <FaPhoneAlt className="me-2" /> Contacts
                    </Link>
                    <Link to="/login"  onClick={handleLogout} className="text-dark text-decoration-none w-100 sidebar-link">
                        <FaSignOutAlt className="me-2" /> Logout
                    </Link>
                   
                </nav>
            </div>
        </header>
    );
};

export default Sidebar;
