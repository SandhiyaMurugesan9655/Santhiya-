import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadPage from './pages/UploadPage';
import SearchPage from './pages/SearchPage';
import AggregatePage from './pages/AggregatePage';
import ScheduleMessagePage from './pages/ScheduleMessagePage';

function App() {
    return (
        <Router>
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
