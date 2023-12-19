import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
    return (
        <div style={styles.container}>
            {/* Navigation */}
            <nav style={styles.nav}>
                <Link to="/login" style={styles.navLink}>ADMIN</Link>
                <Link to="/buy-product" style={styles.navLink}>CLIENT</Link>
            </nav>

            {/* Main Content */}
            <h1>  WELCOME TO WMS APPLICATION</h1>


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

export default WelcomePage;
