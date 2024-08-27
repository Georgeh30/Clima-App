import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchForecast } from '@store/slice/weatherSlice';
import { motion } from 'framer-motion';
import MainLayout from '@layouts/jsx/MainLayout';
import { FaExclamationTriangle } from 'react-icons/fa';

const ForecastPage = () => {
    const [city, setCity] = useState('Ecatepec de Morelos');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedWeather, setSelectedWeather] = useState('');
    const dispatch = useDispatch();
    const forecast = useSelector((state) => state.weather.forecastData);
    const status = useSelector((state) => state.weather.status);
    const error = useSelector((state) => state.weather.error);

    useEffect(() => {
        if (city.trim()) {
            dispatch(fetchForecast(city));
        }
    }, [dispatch, city]);

    const isSameDay = (date1, date2) => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    };

    const convertUTCToLocal = (utcDate) => {
        const localDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000);
        return localDate;
    };

    const addDays = (date, days) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days); // Suma días
        return result;
    };

    // Generate options for the last 6 days
    const generateDateOptions = () => {
        const options = [];
        const today = new Date();
        
        // Generar fechas desde hoy hasta 6 días adelante
        for (let i = 0; i < 6; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i); // Avanzar i días
            const formattedDate = date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
            const displayDate = date.toLocaleDateString(); // Formato legible para el usuario
            options.push({ value: formattedDate, label: displayDate });
        }
    
        return options;
    };
    
    const filteredForecast = forecast?.list.filter((day) => {
        const utcDate = new Date(day.dt * 1000);
        const localDate = convertUTCToLocal(utcDate);
        const selected = selectedDate ? new Date(selectedDate) : null;
        // Sumar un día a la fecha seleccionada
        if (selected) {
            selected = addDays(selected, 1);
        }
        const matchesDate = selected ? isSameDay(localDate, selected) : true;
        const matchesWeather = selectedWeather ? day.weather[0].main === selectedWeather : true;
        return matchesDate && matchesWeather;
    });
    
    return (
        <MainLayout>
            <div className="flex flex-col justify-center items-center flex-grow px-4 py-8 bg-lightBg text-lightText dark:bg-darkBg dark:text-darkText mt-[64px]">
                <div className="max-w-7xl w-full bg-lightNavbar text-lightNavbarText dark:bg-darkNavbar dark:text-darkNavbarText dark:border-lightHover border-darkHover border rounded-lg shadow-lg p-6">
                    <h1 className="text-4xl font-bold text-center mb-6">Weather Forecast</h1>
                    <div className="flex flex-col items-center mb-6 space-y-4">
                        <input
                            type="text"
                            placeholder="Enter city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="border rounded-lg p-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-lightHover dark:focus:ring-darkHover transition duration-300 ease-in-out bg-lightBg text-lightText dark:bg-darkBg dark:text-darkText dark:border-lightHover border-darkHover"
                        />
                        {/* Removed the search button */}
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 mb-6">
                        <select
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-lightHover dark:focus:ring-darkHover bg-lightBg text-lightText dark:bg-darkBg dark:text-darkText dark:border-lightHover border-darkHover"
                        >
                            <option value="">Select Date</option>
                            {generateDateOptions().map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <select
                            value={selectedWeather}
                            onChange={(e) => setSelectedWeather(e.target.value)}
                            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-lightHover dark:focus:ring-darkHover bg-lightBg text-lightText dark:bg-darkBg dark:text-darkText dark:border-lightHover border-darkHover"
                        >
                            <option value="">All Weather Types</option>
                            <option value="Clear">Clear</option>
                            <option value="Clouds">Clouds</option>
                            <option value="Rain">Rain</option>
                            <option value="Snow">Snow</option>
                            <option value="Thunderstorm">Thunderstorm</option>
                        </select>
                    </div>

                    {status === 'loading' && 
                        <div className="flex items-center justify-center p-4 bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-gray-400 border border-gray-400 rounded-lg">
                            <p className="text-lg font-semibold">Loading...</p>
                        </div>}
                    {status === 'succeeded' && (
                        <div>
                            {filteredForecast?.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {filteredForecast.map((day, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5 }}
                                            className="bg-blue-400 text-white dark:bg-blue-900 dark:text-darkText rounded-lg border dark:border-blue-400 border-blue-900 shadow-md p-4"
                                        >
                                            <h2 className="text-xl font-semibold mb-2">
                                                {convertUTCToLocal(new Date(day.dt * 1000)).toLocaleDateString()}
                                            </h2>
                                            <div className="flex items-center justify-between mb-2">
                                                <img
                                                    src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                                                    alt={day.weather[0].description}
                                                    className="w-16 h-16"
                                                />
                                                <p className="text-xl font-bold">{day.main.temp}°C</p>
                                            </div>
                                            <p className="text-lg">Humidity: {day.main.humidity}%</p>
                                            <p className="text-lg">Wind Speed: {day.wind.speed} m/s</p>
                                            <p className="text-lg">Condition: {day.weather[0].description}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex items-center justify-center p-4 bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-400 border border-red-400 rounded-lg">
                                    <FaExclamationTriangle className="w-6 h-6 mr-2" />
                                    <p className="text-lg font-semibold">No information found for the selected filters.</p>
                                </div>
                            )}
                        </div>
                    )}
                    {status === 'failed' && (
                        <div className="flex items-center justify-center p-4 bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-400 border border-red-400 rounded-lg">
                            <FaExclamationTriangle className="w-6 h-6 mr-2" />
                            <p className="text-lg font-semibold">There are no matches</p>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
};

export default ForecastPage;
