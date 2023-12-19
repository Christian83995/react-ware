import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductService from '../services/ProductService';

const ListProduct = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = () => {
        ProductService.getAllProducts()
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const deleteProduct = (productId) => {
        ProductService.deleteProduct(productId)
            .then(() => {
                getAllProducts();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const styles = {
        container: {
            fontFamily: 'Arial, sans-serif',
            margin: 0,
            padding: '20px',
            backgroundColor: '#f4f4f4',
        },
        heading: {
            fontSize: '2rem',
            textAlign: 'center',
            marginBottom: '20px',
        },
        addButton: {
            display: 'block',
            margin: '0 auto',
            padding: '10px 20px',
            backgroundColor: '#2ecc71',
            color: '#fff',
            borderRadius: '5px',
            fontSize: '1.2rem',
            textDecoration: 'none',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
        },
        tableHeader: {
            backgroundColor: '#3498db',
            color: '#fff',
        },
        tableCell: {
            border: '1px solid #ddd',
            padding: '8px',
            textAlign: 'left',
        },
        actionButtons: {
            display: 'flex',
        },
        updateButton: {
            backgroundColor: '#3498db',
            color: '#fff',
            marginRight: '5px',
        },
        deleteButton: {
            backgroundColor: '#e74c3c',
            color: '#fff',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Product List</h2>
            <Link to="/add-product" style={styles.addButton}>
                Add Product
            </Link>
            <table style={styles.table}>
                <thead style={styles.tableHeader}>
                    <tr>
                        <th style={styles.tableCell}>Product Id</th>
                        <th style={styles.tableCell}>Product Name</th>
                        <th style={styles.tableCell}>Description</th>
                        <th style={styles.tableCell}>Quantity</th>
                        <th style={styles.tableCell}>Price</th>
                        <th style={styles.tableCell}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td style={styles.tableCell}>{product.id}</td>
                            <td style={styles.tableCell}>{product.name}</td>
                            <td style={styles.tableCell}>{product.description}</td>
                            <td style={styles.tableCell}>{product.quantity}</td>
                            <td style={styles.tableCell}>{product.price}</td>
                            <td style={{ ...styles.tableCell, ...styles.actionButtons }}>
                                <Link
                                    to={`/edit-product/${product.id}`}
                                    className="btn btn-info"
                                    style={styles.updateButton}
                                >
                                    Update
                                </Link>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteProduct(product.id)}
                                    style={styles.deleteButton}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListProduct;
