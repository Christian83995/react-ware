import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={styles.container}>
            {/* Navigation */}
            <nav style={styles.nav}>
                <Link to="/products" style={styles.navLink}>Product List</Link>
                <Link to="/clients" style={styles.navLink}>Client List</Link>
                <Link to="/reports" style={styles.navLink}>Report</Link>
                <Link to="/add-product" style={styles.navLink}>Add Product</Link>
                <Link to="/" style={styles.navLink}>Log Out</Link>
            </nav>

            {/* Main Content */}
           
            </div>
       
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        margin: 0,
        padding: 0,
        backgroundColor: '#3498db',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
    },
    nav: {
        backgroundColor: '#2c3e50',
        color: '#fff',
        textAlign: 'center',
        padding: '1em',
        width: '100%', // Set the width to 100%
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
    },
    navLink: {
        color: '#fff',
        textDecoration: 'none',
        padding: '1em',
        margin: '0 0.5em',
        fontSize: '1rem',
    },
    mainContent: {
        padding: '2em',
    },
    centerContent: {
        textAlign: 'center',
        color: '#fff',
    },
    heading: {
        fontSize: '2.5rem',
        marginBottom: '20px',
    },
    paragraph: {
        fontSize: '1.5rem',
        marginBottom: '30px',
    },
};

export default Home;
