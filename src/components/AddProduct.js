import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProductService from '../services/ProductService';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    const validateForm = () => {
        let formIsValid = true;
        const newErrors = {};

        if (!name.trim()) {
            formIsValid = false;
            newErrors.name = 'Please enter product name.';
        }

        if (!description.trim()) {
            formIsValid = false;
            newErrors.description = 'Please enter product description.';
        }

        if (!quantity.trim()) {
            formIsValid = false;
            newErrors.quantity = 'Please enter product quantity.';
        } else if (isNaN(quantity) || +quantity <= 0) {
            formIsValid = false;
            newErrors.quantity = 'Please enter a valid positive quantity.';
        }

        if (!price.trim()) {
            formIsValid = false;
            newErrors.price = 'Please enter product price.';
        } else if (isNaN(price) || +price <= 0) {
            formIsValid = false;
            newErrors.price = 'Please enter a valid positive price.';
        }

        setErrors(newErrors);
        return formIsValid;
    };

    const saveOrUpdateProduct = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const product = { name, description, quantity, price };

            if (id) {
                // Update existing product
                ProductService.updateProduct(id, product)
                    .then((response) => {
                        console.log(response.data);
                        navigate('/products');
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                // Create new product
                ProductService.createProduct(product)
                    .then((response) => {
                        console.log(response.data);
                        navigate('/products');
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    };

    useEffect(() => {
        if (id) {
            // Fetch product details for editing
            ProductService.getProductById(id)
                .then((response) => {
                    setName(response.data.name);
                    setDescription(response.data.description);
                    setQuantity(response.data.quantity);
                    setPrice(response.data.price);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [id]);

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#f4f4f4',
        },
        formContainer: {
            width: '300px',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
        },
        title: {
            textAlign: 'center',
            color: '#333',
        },
        formGroup: {
            marginBottom: '20px',
        },
        formLabel: {
            marginBottom: '5px',
            display: 'block',
            fontSize: '1rem',
            fontWeight: 'bold',
            color: '#333',
        },
        formControl: {
            width: '100%',
            padding: '10px',
            fontSize: '1rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box',
        },
        button: {
            padding: '10px 20px',
            backgroundColor: '#17a2b8',
            color: '#fff',
            borderRadius: '5px',
            fontSize: '1.2rem',
            cursor: 'pointer',
            textDecoration: 'none',
            display: 'inline-block',
            marginLeft: '5px',
        },
        textCenter: {
            textAlign: 'center',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2 style={styles.title}>{id ? 'Update Product' : 'Add Product'}</h2>
                <form>
                    <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Product Name:</label>
                        <input
                            type="text"
                            style={styles.formControl}
                            placeholder="Enter product name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && (
                            <div style={{ color: 'red', fontSize: '0.8rem' }}>{errors.name}</div>
                        )}
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Description:</label>
                        <input
                            type="text"
                            style={styles.formControl}
                            placeholder="Enter the description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        {errors.description && (
                            <div style={{ color: 'red', fontSize: '0.8rem' }}>{errors.description}</div>
                        )}
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Quantity:</label>
                        <input
                            type="text"
                            style={styles.formControl}
                            placeholder="Enter the quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        {errors.quantity && (
                            <div style={{ color: 'red', fontSize: '0.8rem' }}>{errors.quantity}</div>
                        )}
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Price:</label>
                        <input
                            type="text"
                            style={styles.formControl}
                            placeholder="Enter the price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        {errors.price && (
                            <div style={{ color: 'red', fontSize: '0.8rem' }}>{errors.price}</div>
                        )}
                    </div>
                    <div style={styles.textCenter}>
                        <button
                            className="btn btn-success"
                            style={styles.button}
                            onClick={(e) => saveOrUpdateProduct(e)}
                        >
                            Submit
                        </button>
                        <Link to="/products" className="btn btn-danger" style={styles.button}>
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
