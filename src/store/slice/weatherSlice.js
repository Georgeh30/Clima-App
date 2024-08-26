import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const fetchWeather = createAsyncThunk(
    'weather/fetchWeather',
    async (city, { rejectWithValue }) => {
        try {
            const apiKey = process.env.REACT_APP_WEATHER_API_KEY; // Usa la variable de entorno
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

            if (!response.ok) {
                throw new Error('Failed to fetch');
            }

            const data = await response.json();

            if (!data || data.cod !== 200) {
                throw new Error(data.message || 'Failed to fetch');
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const fetchForecast = createAsyncThunk(
    'weather/fetchForecast',
    async (city, { rejectWithValue }) => {
        try {
            const apiKey = process.env.REACT_APP_WEATHER_API_KEY; // Usa la variable de entorno
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);

            if (!response.ok) {
                throw new Error('Failed to fetch');
            }

            const data = await response.json();

            if (!data || data.cod !== '200') {
                throw new Error(data.message || 'Failed to fetch');
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
      weatherData: null,
      forecastData: null,
      status: 'idle',
      error: null,
    },
    reducers: {},
    extraReducers(builder) {
      builder
        .addCase(fetchWeather.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(fetchWeather.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.weatherData = action.payload;
        })
        .addCase(fetchWeather.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload || 'Failed to fetch data';
          console.log('Error fetching weather data:', action.payload);
        })
        .addCase(fetchForecast.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(fetchForecast.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.forecastData = action.payload;
        })
        .addCase(fetchForecast.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload || 'Failed to fetch data';
          console.log('Error fetching forecast data:', action.payload);
        });
    },
});

export default weatherSlice.reducer;
export { fetchWeather, fetchForecast };
