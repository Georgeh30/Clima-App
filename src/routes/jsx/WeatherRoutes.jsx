import { Routes, Route, Navigate } from 'react-router-dom';

import HomePage from '@pages/home/jsx/HomePage';
import ForecastPage from '@pages/forecast/jsx/ForecastPage';
import NotFoundPage from '@pages/not_found/jsx/NotFoundPage';

const WeatherRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={<Navigate replace to="Home" />}
            />
            <Route
                key="/Home"
                path="/Home"
                element={<HomePage />}
            />
            <Route
                key="/Forecast"
                path="/Forecast"
                element={<ForecastPage />}
            />
            <Route 
                path="/*" 
                element={<NotFoundPage />}
            />
        </Routes>
    );
}

export default WeatherRoutes;
