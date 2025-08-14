
import React, { useEffect, useState } from 'react';
import { getAggregatedPolicies } from '../services/policyService';

function AggregatePage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        getAggregatedPolicies()
            .then(res => {
                setData(res.data.users || []);
                setError('');
            })
            .catch(err => {
                setError(err.response?.data?.message || 'Failed to fetch data.');
                setData([]);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div>
            <h2>Policy Summary</h2>
            {loading && <div>Loading...</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {!loading && !error && (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
                    <thead>
                        <tr style={{ background: '#f0f0f0' }}>
                            <th style={{ border: '1px solid #ccc', padding: 8 }}>First Name</th>
                            <th style={{ border: '1px solid #ccc', padding: 8 }}>Email</th>
                            <th style={{ border: '1px solid #ccc', padding: 8 }}>User Type</th>
                            <th style={{ border: '1px solid #ccc', padding: 8 }}>Policy Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 && (
                            <tr>
                                <td colSpan={4} style={{ textAlign: 'center', padding: 16 }}>No data found.</td>
                            </tr>
                        )}
                        {data.map((user, idx) => (
                            <tr key={idx}>
                                <td style={{ border: '1px solid #ccc', padding: 8 }}>{user.user.first_name}</td>
                                <td style={{ border: '1px solid #ccc', padding: 8 }}>{user.user.email}</td>
                                <td style={{ border: '1px solid #ccc', padding: 8 }}>{user.user.userType}</td>
                                <td style={{ border: '1px solid #ccc', padding: 8 }}>{user.policyCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default AggregatePage;
