import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@styles/global.css';

// Importa Provider y el store de Redux
import { Provider } from 'react-redux';
import { store } from '@store';

import App from '@app/jsx/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>,
)
