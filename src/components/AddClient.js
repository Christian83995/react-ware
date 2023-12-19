import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ClientService from '../services/ClientService';

const AddClient = () => {
    const [email, setEmail] = useState('');
    const [uprice, setUprice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [total, setTotal] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        // Fetch product list from your product table
        ClientService.getProducts()
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        if (id) {
            // Fetch product details for editing
            ClientService.getClientById(id)
                .then((response) => {
                    setEmail(response.data.email);
                    setSelectedProduct(response.data.product);
                    setUprice(response.data.uprice.toString()); // Convert to string
                    setQuantity(response.data.quantity.toString()); // Convert to string
                    setTotal(response.data.total.toString()); // Convert to string
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [id]);

    useEffect(() => {
        const selectedProductData = products.find((product) => product.name === selectedProduct);
        if (selectedProductData) {
            setUprice(selectedProductData.price.toString()); // Convert to string
        }
    }, [selectedProduct, products]);

    useEffect(() => {
        const totalPrice = (parseFloat(uprice) * parseFloat(quantity)).toString(); // Convert to string
        setTotal(totalPrice);
    }, [uprice, quantity]);

    const validateForm = () => {
        let formIsValid = true;
        const newErrors = {};

        if (!email.trim()) {
            formIsValid = false;
            newErrors.email = 'Please enter email.';
        }

        if (!selectedProduct) {
            formIsValid = false;
            newErrors.selectedProduct = 'Please select a product.';
        }

        if (!uprice.trim()) {
            formIsValid = false;
            newErrors.uprice = 'Please enter unit price.';
        } else if (isNaN(uprice) || parseFloat(uprice) <= 0) {
            formIsValid = false;
            newErrors.uprice = 'Please enter a valid positive unit price.';
        }

        if (!quantity.trim()) {
            formIsValid = false;
            newErrors.quantity = 'Please enter quantity.';
        } else if (isNaN(quantity) || parseFloat(quantity) <= 0) {
            formIsValid = false;
            newErrors.quantity = 'Please enter a valid positive quantity.';
        }

        if (!total.trim()) {
            formIsValid = false;
            newErrors.total = 'Please enter total price.';
        } else if (isNaN(total) || parseFloat(total) <= 0) {
            formIsValid = false;
            newErrors.total = 'Please enter a valid positive total price.';
        }

        setErrors(newErrors);
        return formIsValid;
    };

    const saveOrUpdateClient = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const client = { email, product: selectedProduct, uprice, quantity, total };

            const handleSuccess = (message) => {
                console.log(message);
                navigate('/clients');
            };

            const handleError = (error) => {
                console.error(error);
            };

            if (id) {
                // Update existing product
                ClientService.updateClient(id, client)
                    .then(() => handleSuccess('Client updated successfully'))
                    .catch(handleError);
            } else {
                // Create new product
                ClientService.createClient(client)
                    .then(() => handleSuccess('Client created successfully'))
                    .catch(handleError);
            }
        }
    };

    const styles = {
        container: {
            fontFamily: 'Arial, sans-serif',
            margin: 0,
            padding: 0,
            backgroundColor: '#f4f4f4',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '100vh',
        },
        card: {
            maxWidth: '500px',
            margin: '20px auto',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            backgroundColor: '#fff',
        },
        form: {
            marginBottom: '0',
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
        select: {
            width: '100%',
            padding: '10px',
            fontSize: '1rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box',
        },
        button: {
            padding: '10px 20px',
            backgroundColor: '#2ecc71',
            color: '#fff',
            borderRadius: '5px',
            fontSize: '1.2rem',
            cursor: 'pointer',
        },
        cancelButton: {
            padding: '10px 20px',
            backgroundColor: '#e74c3c',
            color: '#fff',
            borderRadius: '5px',
            fontSize: '1.2rem',
            cursor: 'pointer',
            marginLeft: '10px',
        },
        title: {
            fontSize: '2rem',
            textAlign: 'center',
            marginBottom: '20px',
            color: '#333',
        },
    };

    return (
        <div style={styles.container}>
            <div className="card" style={styles.card}>
                {id ? <h2 style={styles.title}>Update Client</h2> : <h2 style={styles.title}>Buy Product</h2>}
                <div style={styles.form}>
                    <form>
                        <div style={styles.formGroup}>
                            <label style={styles.formLabel}>Email:</label>
                            <input
                                type="email"
                                style={styles.formControl}
                                placeholder="Enter email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && (
                                <div style={{ color: 'red', fontSize: '0.8rem' }}>{errors.email}</div>
                            )}
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.formLabel}>Product:</label>
                            <select
                                style={styles.select}
                                value={selectedProduct}
                                onChange={(e) => setSelectedProduct(e.target.value)}
                            >
                                <option value="">Select a product</option>
                                {products.map((product) => (
                                    <option key={product.id} value={product.name}>
                                        {product.name}
                                    </option>
                                ))}
                            </select>
                            {errors.selectedProduct && (
                                <div style={{ color: 'red', fontSize: '0.8rem' }}>
                                    {errors.selectedProduct}
                                </div>
                            )}
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.formLabel}>Unit Price:</label>
                            <input
                                type="text"
                                style={styles.formControl}
                                placeholder="Enter the price"
                                name="uprice"
                                value={uprice}
                                onChange={(e) => setUprice(e.target.value)}
                            />
                            {errors.uprice && (
                                <div style={{ color: 'red', fontSize: '0.8rem' }}>{errors.uprice}</div>
                            )}
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.formLabel}>Quantity:</label>
                            <input
                                type="text"
                                style={styles.formControl}
                                placeholder="Enter the quantity"
                                name="quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                            {errors.quantity && (
                                <div style={{ color: 'red', fontSize: '0.8rem' }}>{errors.quantity}</div>
                            )}
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.formLabel}>Total Price:</label>
                            <input
                                type="text"
                                style={styles.formControl}
                                placeholder="Enter the price"
                                name="total"
                                value={total}
                                onChange={(e) => setTotal(e.target.value)}
                            />
                            {errors.total && (
                                <div style={{ color: 'red', fontSize: '0.8rem' }}>{errors.total}</div>
                            )}
                        </div>

                        <button style={styles.button} onClick={(e) => saveOrUpdateClient(e)}>
                            Submit
                        </button>

                        <Link to="/clients" style={styles.cancelButton}>
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddClient;
