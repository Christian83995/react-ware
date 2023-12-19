import React from 'react';

const Footer = () => {
    return (
        <div style={{ marginTop: 'auto' }}>
            <footer style={{
                position: 'relative',
                bottom: 0,
                width: '100%',
                height: '50px',
                backgroundColor: 'black',
                textAlign: 'center',
                color: 'white',
            }} className="footer">
                <br />
                <span className="text-muted">All Rights Reserved 2023 @Madaoua</span>
            </footer>
        </div>
    );
};

export default Footer;
