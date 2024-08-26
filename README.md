# Guía Completa para Configurar un Proyecto React con Vite, Tailwind, Redux, y OpenWeatherMap API

Este documento detalla los pasos para crear, configurar, ejecutar, y desplegar un proyecto React con Vite, Tailwind CSS, React Router, Redux, y la API de clima de OpenWeatherMap. También incluye instrucciones para configurar el proyecto en Netlify, asegurando que las rutas dinámicas funcionen correctamente y gestionando la clave de la API de forma segura.

## Índice

1. [Configuración Inicial del Proyecto](#1-configuración-inicial-del-proyecto)
   - [1.1. Instalación de Dependencias](#11-instalación-de-dependencias)
   - [1.2. Configuración de Tailwind CSS](#12-configuración-de-tailwind-css)
   - [1.3. Configuración de React Router](#13-configuración-de-react-router)
   - [1.4. Configuración de Redux y Redux Toolkit](#14-configuración-de-redux-y-redux-toolkit)
   - [1.5. Configuración de la API de OpenWeatherMap](#15-configuración-de-la-api-de-openweathermap)
2. [Inicialización del Proyecto](#2-inicialización-del-proyecto)
3. [Despliegue en Netlify](#3-despliegue-en-netlify)
   - [3.1. Configuración de las Rutas Dinámicas](#31-configuración-de-las-rutas-dinámicas)
   - [3.2. Variables de Entorno en Netlify](#32-variables-de-entorno-en-netlify)
4. [Gestión de Código con Git](#4-gestión-de-código-con-git)
   - [4.1. Inicialización del Repositorio](#41-inicialización-del-repositorio)
   - [4.2. Guardar Cambios y Actualizar GitHub](#42-guardar-cambios-y-actualizar-github)

## 1. Configuración Inicial del Proyecto

### 1.1. Instalación de Dependencias

1. **Crea un nuevo proyecto React con Vite:**

    ```bash
    npm create vite@latest my-weather-app -- --template react
    cd my-weather-app
    ```

2. **Instala Tailwind CSS y sus dependencias:**

    ```bash
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    ```

3. **Instala React Router, Redux, Redux Toolkit, y cpx:**

    ```bash
    npm install react-router-dom redux @reduxjs/toolkit cpx
    ```

### 1.2. Configuración de Tailwind CSS

Configura Tailwind CSS en `tailwind.config.js` y `src/index.css`:

1. **Modifica `tailwind.config.js`:**

    ```javascript
    /** @type {import('tailwindcss').Config} */
    export default {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }
    ```

2. **Configura Tailwind en `src/index.css`:**

    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

### 1.3. Configuración de React Router

1. **Crea un archivo `src/App.jsx` para definir las rutas:**

    ```jsx
    import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
    import Home from "./pages/Home";
    import About from "./pages/About";

    function App() {
      return (
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Router>
      );
    }

    export default App;
    ```

2. **Actualiza `src/main.jsx` para usar React Router:**

    ```jsx
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import App from './App';
    import './index.css';

    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
    ```

### 1.4. Configuración de Redux y Redux Toolkit

1. **Configura el `store` en `src/store.js`:**

    ```javascript
    import { configureStore } from '@reduxjs/toolkit';
    import weatherReducer from './features/weather/weatherSlice';

    export const store = configureStore({
      reducer: {
        weather: weatherReducer,
      },
    });
    ```

2. **Configura un `slice` para la API del clima en `src/features/weather/weatherSlice.js`:**

    ```javascript
    import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

    export const fetchWeather = createAsyncThunk(
      'weather/fetchWeather',
      async (city) => {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
        );
        return response.json();
      }
    );

    const weatherSlice = createSlice({
      name: 'weather',
      initialState: { data: null, status: 'idle' },
      extraReducers: (builder) => {
        builder
          .addCase(fetchWeather.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchWeather.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
          })
          .addCase(fetchWeather.rejected, (state) => {
            state.status = 'failed';
          });
      },
    });

    export default weatherSlice.reducer;
    ```

### 1.5. Configuración de la API de OpenWeatherMap

1. **Crea un archivo `.env` en la raíz del proyecto:**

    ```plaintext
    VITE_WEATHER_API_KEY=your_openweathermap_api_key_here
    ```

2. **Accede a la clave de la API en tu código:**

    Utiliza `import.meta.env.VITE_WEATHER_API_KEY` para acceder a la clave en cualquier parte de tu código:

    ```javascript
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    ```

## 2. Inicialización del Proyecto

1. **Ejecuta el servidor de desarrollo:**

    ```bash
    npm run dev
    ```

2. **Abre el proyecto en tu navegador:**

    Visita `http://localhost:5173/` en tu navegador para ver tu aplicación en desarrollo.

## 3. Despliegue en Netlify

### 3.1. Configuración de las Rutas Dinámicas

1. **Crea un archivo `_redirects` en la raíz del proyecto:**

    Contenido del archivo `_redirects`:

    ```plaintext
    /*    /index.html   200
    ```

2. **Modifica los scripts de `package.json` para copiar `_redirects` después del build:**

    ```json
    "scripts": {
      "build": "vite build && npm run postbuild",
      "postbuild": "cpx _redirects dist/"
    }
    ```

3. **Instala la dependencia `cpx` para manejar el copiado del archivo `_redirects`:**

    ```bash
    npm install --save-dev cpx
    ```

### 3.2. Variables de Entorno en Netlify

1. **Configura la variable de entorno en Netlify:**

    En la configuración de tu sitio en Netlify, añade una nueva variable de entorno:

    - **Key:** `VITE_WEATHER_API_KEY`
    - **Value:** tu clave de la API de OpenWeatherMap

2. **Despliega el proyecto en Netlify:**

    Sigue el proceso de despliegue en Netlify. El proyecto se construirá y desplegará automáticamente.

## 4. Gestión de Código con Git

### 4.1. Inicialización del Repositorio

1. **Inicializa un nuevo repositorio Git:**

    ```bash
    git init
    ```

2. **Añade archivos al repositorio:**

    ```bash
    git add .
    ```

3. **Realiza el primer commit:**

    ```bash
    git commit -m "Initial commit"
    ```

4. **Añade un remoto y sube el proyecto a GitHub:**

    ```bash
    git remote add origin <URL_del_repositorio>
    git branch -M main
    git push -u origin main
    ```

### 4.2. Guardar Cambios y Actualizar GitHub

1. **Añade los archivos modificados al repositorio:**

    ```bash
    git add .
    ```

2. **Realiza un commit con un mensaje descriptivo:**

    ```bash
    git commit -m "Descripción de los cambios realizados"
    ```

3. **Sube los cambios a GitHub:**

    ```bash
    git push
    ```

## Conclusión

Este documento cubre todos los pasos para configurar, desarrollar y desplegar un proyecto React con Vite, Tailwind CSS, React Router, Redux, y la API de OpenWeatherMap. La integración con Netlify permite un despliegue fácil y seguro, incluyendo la gestión de rutas dinámicas y variables de entorno.
