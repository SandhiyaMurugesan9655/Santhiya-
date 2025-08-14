
import React, { useState } from 'react';
import { scheduleMessage } from '../services/policyService';

function ScheduleMessagePage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [scheduledFor, setScheduledFor] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (!email || !message || !scheduledFor) {
            setError('All fields are required.');
            return;
        }
        setLoading(true);
        try {
            await scheduleMessage({ email, message, scheduledFor });
            setSuccess('Message scheduled successfully!');
            setEmail('');
            setMessage('');
            setScheduledFor('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to schedule message.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Schedule a Message</h2>
            <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
                <div style={{ marginBottom: 12 }}>
                    <input
                        type="email"
                        placeholder="User Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        disabled={loading}
                        style={{ width: '100%', padding: 8 }}
                    />
                </div>
                <div style={{ marginBottom: 12 }}>
                    <textarea
                        placeholder="Message"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        disabled={loading}
                        style={{ width: '100%', padding: 8, minHeight: 60 }}
                    />
                </div>
                <div style={{ marginBottom: 12 }}>
                    <input
                        type="datetime-local"
                        value={scheduledFor}
                        onChange={e => setScheduledFor(e.target.value)}
                        disabled={loading}
                        style={{ width: '100%', padding: 8 }}
                    />
                </div>
                <button type="submit" disabled={loading} style={{ width: '100%' }}>
                    {loading ? 'Scheduling...' : 'Schedule Message'}
                </button>
            </form>
            {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
            {success && <div style={{ color: 'green', marginTop: 12 }}>{success}</div>}
        </div>
    );
}

export default ScheduleMessagePage;
