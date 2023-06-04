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

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AnimatePresence>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AnimatePresence>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
