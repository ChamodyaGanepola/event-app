import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { routes } from './routes/routes.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: routes, // Define child routes
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
