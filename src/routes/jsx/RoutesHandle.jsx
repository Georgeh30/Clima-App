import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import WeatherRoutes from '@routes/jsx/WeatherRoutes';
import NotFoundPage from '@pages/not_found/jsx/NotFoundPage';

const RoutesHandle = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<Navigate replace to="/Weather" />}
                />
                <Route
                    path="/Weather/*"
                    element={<WeatherRoutes />}
                />
                <Route 
                    path="/*" 
                    element={<NotFoundPage />}
                />
            </Routes>
        </Router>
    );
}

export default RoutesHandle;
