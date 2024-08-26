import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '@store/slice/weatherSlice';
import { motion } from 'framer-motion';
import MainLayout from '@layouts/jsx/MainLayout';
import { FaExclamationTriangle } from 'react-icons/fa';

const HomePage = () => {
    const [city, setCity] = useState('Ecatepec de Morelos'); // Set default city
    const dispatch = useDispatch();
    const weather = useSelector((state) => state.weather.weatherData);
    const status = useSelector((state) => state.weather.status);
    const error = useSelector((state) => state.weather.error);

    useEffect(() => {
        // Fetch weather data for default city when component mounts
        dispatch(fetchWeather(city));
    }, [dispatch, city]);

    const handleSearch = () => {
        if (city.trim()) {
            dispatch(fetchWeather(city));
        }
    };

    return (
        <MainLayout>
            <div className="flex flex-col justify-center items-center flex-grow px-4 py-8 bg-lightBg text-lightText dark:bg-darkBg dark:text-darkText mt-[64px]">
                <div className="max-w-md w-full bg-lightNavbar text-lightNavbarText dark:bg-darkNavbar dark:text-darkNavbarText rounded-lg shadow-lg p-6">
                    <h1 className="text-3xl font-bold text-center mb-4">Weather App</h1>
                    <div className="flex flex-col items-center mb-6">
                        <input
                            type="text"
                            placeholder="Enter city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="border rounded-lg p-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-lightHover dark:focus:ring-darkHover transition duration-300 ease-in-out bg-lightBg text-lightText dark:bg-darkBg dark:text-darkText"
                        />
                        <button
                            onClick={handleSearch}
                            className="mt-3 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition duration-300 ease-in-out"
                        >
                            Search
                        </button>
                    </div>

                    {status === 'loading' && (
                        <div className="flex items-center justify-center p-4 bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-gray-400 border border-gray-400 rounded-lg">
                            <p className="text-lg font-semibold">Loading...</p>
                        </div>
                    )}
                    {status === 'succeeded' && weather && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="mt-6 text-white dark:bg-blue-900 dark:text-darkText rounded-lg shadow-md p-4 bg-blue-400"
                        >
                            <h2 className="text-2xl font-semibold mb-2">{weather.name}</h2>
                            <div className="flex items-center justify-between mb-2">
                                <img
                                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                                    alt={weather.weather[0].description}
                                    className="w-16 h-16"
                                />
                                <p className="text-xl font-bold">{weather.main.temp}°C</p>
                            </div>
                            <p className="text-lg">Humidity: {weather.main.humidity}%</p>
                            <p className="text-lg">Wind Speed: {weather.wind.speed} m/s</p>
                            <p className="text-lg">Condition: {weather.weather[0].description}</p>
                        </motion.div>
                    )}
                    {status === 'failed' && (
                        <div className="flex items-center justify-center p-4 bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-400 border border-red-400 rounded-lg">
                            <FaExclamationTriangle className="w-6 h-6 mr-2" />
                            <p className="text-lg font-semibold">Error fetching data: {error}</p>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
};

export default HomePage;
