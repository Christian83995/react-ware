import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ClientService from '../services/ClientService';

const ListClient = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        getAllClients();
    }, []);

    const getAllClients = () => {
        ClientService.getAllClients()
            .then((response) => {
                setClients(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const deleteClient = (clientId) => {
        ClientService.deleteClient(clientId)
            .then((response) => {
                getAllClients();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#f4f4f4',
        },
        tableContainer: {
            width: '80%',
            margin: '20px auto',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
        },
        th: {
            background: '#17a2b8',
            color: '#fff',
            fontWeight: 'bold',
            padding: '10px',
            textAlign: 'left',
        },
        td: {
            padding: '10px',
            borderBottom: '1px solid #ddd',
        },
        actionButtons: {
            display: 'flex',
            alignItems: 'center',
        },
        updateButton: {
            backgroundColor: '#28a745',
            color: '#fff',
            marginRight: '10px',
        },
        deleteButton: {
            backgroundColor: '#dc3545',
            color: '#fff',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.tableContainer}>
                <h2 className="text-center">Client List</h2>
                <table style={styles.table} className="table table-bordered table-striped">
                    <thead>
                        <tr style={styles.th}>
                            <th>Client Id</th>
                            <th>Email</th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client) => (
                            <tr key={client.id} style={styles.td}>
                                <td>{client.id}</td>
                                <td>{client.email}</td>
                                <td>{client.product}</td>
                                <td>{client.uprice}</td>
                                <td>{client.quantity}</td>
                                <td>{client.total}</td>
                                <td style={styles.actionButtons}>
                                    <Link
                                        className="btn btn-info"
                                        to={`/edit-client/${client.id}`}
                                        style={styles.updateButton}
                                    >
                                        Update
                                    </Link>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteClient(client.id)}
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
        </div>
    );
};

export default ListClient;
