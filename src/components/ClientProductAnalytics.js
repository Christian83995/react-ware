import React, { useEffect, useState } from 'react';
import ClientService from '../services/ClientService';

const ClientProductAnalytics = () => {
    const [analyticsData, setAnalyticsData] = useState([]);

    useEffect(() => {
        // Fetch client-product analytics data
        ClientService.getClientProductAnalytics()
            .then((data) => {
                setAnalyticsData(data);
            })
            .catch((error) => {
                console.error('Error fetching client-product analytics:', error);
            });
    }, []);

    return (
        <div>
            <h2>Client-Product Analytics Report</h2>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Total Clients</th>
                    </tr>
                </thead>
                <tbody>
                    {analyticsData.map((item) => (
                        <tr key={item.productId}>
                            <td>{item.productName}</td>
                            <td>{item.totalClients}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClientProductAnalytics;
