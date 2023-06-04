import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Provider } from 'react-redux';
import { store } from './redux/app/store';
import AppRoutes from './routes/AppRoutes';
import './index.css';
import 'rsuite/dist/rsuite.min.css';
import 'react-multi-carousel/lib/styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

/*
Root entry point of the React application.
Enables strict mode for enhanced debugging and error detection.
Uses the Redux Provider to provide the Redux store to the entire app.
Incorporates page transitions with AnimatePresence for smoother UI transitions.
Uses BrowserRouter for client-side routing and renders the main AppRoutes component.
*/
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AnimatePresence mode="wait" initial={true}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AnimatePresence>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
