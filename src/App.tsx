import React from 'react';
import './App.css';
import { MainPage } from './pages/MainPage/MainPage';
import { MetaMaskContextProvider } from './hooks/useMetaMask';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CheckCertPage } from './pages/CheckCertPage/CheckCertPage';
import { AddCertPage } from './pages/AddCertPage/AddCertPage';
import { AddIssuerPage } from './pages/AddIssuerPage/AddIssuerPage'
import { RemoveIssuerPage } from './pages/RemoveIssuerPage/RemoveIssuerPage'
import { InvalidateCertPage } from './pages/InvalidateCertPage/InvalidateCertPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/check-certificate',
    element: <CheckCertPage />,
  },
  {
    path: '/add-certificate',
    element: <AddCertPage />,
  },
  {
    path: '/add-issuer',
    element: <AddIssuerPage />,
  },
  {
    path: '/remove-issuer',
    element: <RemoveIssuerPage />,
  },
  {
    path: '/invalidate-certificate',
    element: <InvalidateCertPage />,
  },
]);

function App() {
  return (
    <MetaMaskContextProvider>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </MetaMaskContextProvider>
  );
}

export default App;
