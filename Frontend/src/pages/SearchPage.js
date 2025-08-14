import React, { useState } from 'react';
import { searchPolicyByUsername } from '../services/policyService';

function SearchPage() {
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [results, setResults] = useState(null);

    const handleChange = (e) => {
        setUsername(e.target.value);
        setError('');
        setResults(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username.trim()) {
            setError('Please enter a username.');
            return;
        }
        setLoading(true);
        setError('');
        setResults(null);
        try {
            const res = await searchPolicyByUsername(username);
            setResults(res.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Search failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Search Policy Info</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={handleChange}
                    disabled={loading}
                />
                <button type="submit" disabled={loading} style={{ marginLeft: 8 }}>
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>
            {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
            {results && (
                <div style={{ marginTop: 16 }}>
                    <h4>Results:</h4>
                    <pre style={{ background: '#f4f4f4', padding: 8 }}>{JSON.stringify(results, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default SearchPage;
