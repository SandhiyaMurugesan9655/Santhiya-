import React, { useState } from 'react';
import { uploadFile } from '../services/policyService';

function UploadPage() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file.');
            return;
        }
        setLoading(true);
        setError('');
        setSuccess('');
        const formData = new FormData();
        formData.append('file', file);
        try {
            await uploadFile(formData);
            setSuccess('File uploaded successfully!');
            setFile(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Upload failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Upload CSV/XLSX</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    onChange={handleFileChange}
                    disabled={loading}
                />
                <button type="submit" disabled={loading} style={{ marginLeft: 8 }}>
                    {loading ? 'Uploading...' : 'Upload'}
                </button>
            </form>
            {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
            {success && <div style={{ color: 'green', marginTop: 8 }}>{success}</div>}
        </div>
    );
}

export default UploadPage;
