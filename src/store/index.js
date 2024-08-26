import { configureStore } from '@reduxjs/toolkit';
import weatherSlice from '@store/slice/weatherSlice';

export const store = configureStore({
  reducer: {
    weather: weatherSlice,
  },
});
