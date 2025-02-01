import React, { useState, useEffect } from 'react';
import { createProductApi, deleteProduct, getAllProducts, getOrdersApi, updateOrderStatusApi } from '../../../apis/Api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import '../admin_dashboard/AdminDashboard.css';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderModalVisible, setOrderModalVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productResponse = await getAllProducts();
                setProducts(productResponse.data.products);

                const orderResponse = await getOrdersApi();
                setOrders(orderResponse.data.orders);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [productImage, setProductImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    const handleImage = (event) => {
        const file = event.target.files[0];
        setProductImage(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('productPrice', productPrice);
        formData.append('productCategory', productCategory);
        formData.append('productDescription', productDescription);
        formData.append('productQuantity', productQuantity);
        formData.append('productImage', productImage);

        createProductApi(formData)
            .then((res) => {
                if (res.status === 201) {
                    toast.success(res.data.message);
                    getAllProducts().then((res) => setProducts(res.data.products));
                }
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 400) {
                        toast.warning(error.response.data.message);
                    } else if (error.response.status === 500) {
                        toast.error(error.response.data.message);
                    } else {
                        toast.error('Something went wrong!');
                    }
                } else {
                    toast.error('Something went wrong!');
                }
            });
    };

    const handleDelete = (id) => {
        const confirmDialog = window.confirm('Are you sure you want to delete this product?');
        if (confirmDialog) {
            deleteProduct(id)
                .then((res) => {
                    if (res.status === 201) {
                        toast.success(res.data.message);
                        getAllProducts().then((res) => setProducts(res.data.products));
                    }
                })
                .catch((error) => {
                    if (error.response.status === 500) {
                        toast.error(error.response.data.message);
                    }
                });
        }
    };

    const handleUpdateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await updateOrderStatusApi(orderId, { status: newStatus });
            if (response.status === 200) {
                toast.success('Order status updated successfully');
                const updatedOrders = await getOrdersApi();
                setOrders(updatedOrders.data.orders);
            }
        } catch (error) {
            toast.error('An error occurred while updating the order status');
        }
    };

    return (
        <div className="admin container mt-1 vh-100 overflow-auto" style={{ marginLeft: '250px' }}>
        
            {/* Modal for adding product */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h1 className="modal-title fs-5 fw-bold text-center" id="exampleModalLabel">
                                Create a new product!
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <label>Product Name</label>
                                <input
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter product name"
                                />

                                <label className="mt-2">Product Price</label>
                                <input
                                    value={productPrice}
                                    onChange={(e) => setProductPrice(e.target.value)}
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter product price"
                                />

                                <label className="mt-2">Choose category</label>
                                <select
                                    value={productCategory}
                                    onChange={(e) => setProductCategory(e.target.value)}
                                    className="form-control"
                                >
                                    <option value="">Select a Category</option>
                                    <option value="clothes">Clothes</option>
                                    <option value="Living & Care">Living & Care</option>
                                    <option value="Toys">Toys</option>
                                    <option value="Services">Services</option>
                                    <option value="Health & Beauty">Health & Beauty</option>
                                    <option value="Bedroom & Decor">Bedroom & Decor</option>
                                </select>

                                <label className="mt-2">Enter quantity</label>
                                <input
                                    value={productQuantity}
                                    onChange={(e) => setProductQuantity(e.target.value)}
                                    type="number"
                                    className="form-control"
                                />

                                <label className="mt-2">Enter description</label>
                                <textarea
                                    value={productDescription}
                                    onChange={(e) => setProductDescription(e.target.value)}
                                    className="form-control"
                                ></textarea>

                                <label className="mt-2">Choose product Image</label>
                                <input
                                    onChange={handleImage}
                                    type="file"
                                    className="form-control"
                                />

                                {previewImage && <img src={previewImage} alt="preview" className="img-fluid rounded mt-2" />}
                                
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                        Close
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Save changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table for displaying products */}
            <table className="table mt-4 table-hover table-striped table-bordered table-responsive table-blue text-center shadow w-100 overflow-auto">
                <thead className="table-blue">
                    <tr>
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((singleProduct) => (
                        <tr key={singleProduct._id}>
                            <td>
                                <img
                                    src={`https://localhost:5000/products/${singleProduct.productImage}`}
                                    alt="product"
                                    className="img-fluid rounded"
                                    style={{ width: '100px', height: '100px', borderRadius: '10px' }}
                                />
                            </td>
                            <td>{singleProduct.productName}</td>
                            <td>{singleProduct.productPrice}</td>
                            <td>{singleProduct.productCategory}</td>
                            <td>{singleProduct.productQuantity}</td>
                            <td>{singleProduct.productDescription}</td>
                            <td>
                                <Link to={`/admin/update/${singleProduct._id}`} className="btn btn-success me-2">
                                    Edit
                                </Link>
                                <button onClick={() => handleDelete(singleProduct._id)} className="btn btn-danger">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Table for displaying orders */}
            <table className="table mt-4 table-hover table-striped table-bordered table-responsive table-blue text-center shadow w-100 overflow-auto">
                <thead className="table-blue">
                    <tr>
                        <th>Order ID</th>
                        <th>Customer Address</th>
                        <th>Order Total</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.address}</td>
                            <td>{order.total}</td>
                            <td>{order.status}</td>
                            <td>
                                <button
                                    className="btn btn-primary rounded-pill me-2"
                                    onClick={() => {
                                        setSelectedOrder(order);
                                        setOrderModalVisible(true);
                                    }}
                                >
                                    Update Status
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for updating order status */}
            {selectedOrder && (
                <div className={`modal fade ${orderModalVisible ? 'show d-block' : ''}`} tabIndex="-1" aria-labelledby="orderModalLabel" aria-hidden={!orderModalVisible}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header text-center">
                                <h1 className="modal-title fs-5 fw-bold text-center" id="orderModalLabel">
                                    Update Order Status
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setOrderModalVisible(false)}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <label>Order ID</label>
                                    <input
                                        value={selectedOrder._id}
                                        readOnly
                                        type="text"
                                        className="form-control"
                                    />

                                    <label className="mt-2">Update Status</label>
                                    <select
                                        value={selectedOrder.status}
                                        onChange={(e) => setSelectedOrder({ ...selectedOrder, status: e.target.value })}
                                        className="form-control"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>

                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => setOrderModalVisible(false)}
                                        >
                                            Close
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => {
                                                handleUpdateOrderStatus(selectedOrder._id, selectedOrder.status);
                                                setOrderModalVisible(false);
                                            }}
                                        >
                                            Save changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
