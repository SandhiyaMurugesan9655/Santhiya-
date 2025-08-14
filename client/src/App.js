
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UploadPage from './pages/UploadPage';
import SearchPage from './pages/SearchPage';
import AggregatePage from './pages/AggregatePage';
import ScheduleMessagePage from './pages/ScheduleMessagePage';

function App() {
    return (
        <Router>
            <nav style={{ padding: 16, background: '#f0f0f0', marginBottom: 24 }}>
                <Link to="/" style={{ marginRight: 16 }}>Upload</Link>
                <Link to="/search" style={{ marginRight: 16 }}>Search</Link>
                <Link to="/schedule">Schedule</Link>
            </nav>
            <Routes>
                <Route path="/" element={<UploadPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/aggregate" element={<AggregatePage />} />
                <Route path="/schedule" element={<ScheduleMessagePage />} />
            </Routes>
        </Router>
    );
}

export default App;
