import React from 'react';
import './App.css';
import { MainPage } from './pages/MainPage/MainPage';
import { MetaMaskContextProvider } from './hooks/useMetaMask';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CheckCertPage } from './pages/CheckCertPage/CheckCertPage';
import { AddCertPage } from './pages/AddCertPage/AddCertPage';
import { AddIssuerPage } from './pages/AddIssuerPage/AddIssuerPage';
import { RemoveIssuerPage } from './pages/RemoveIssuerPage/RemoveIssuerPage';
import { InvalidateCertPage } from './pages/InvalidateCertPage/InvalidateCertPage';
import { RoutePermissionChecker } from './components/RoutePermissionChecker/RoutePermissionChecker';
import { IssuedCertsPage } from './pages/IssuedCertsPage/IssuedCertsPage';

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
    element: (
      <RoutePermissionChecker>
        <AddCertPage />
      </RoutePermissionChecker>
    ),
  },
  {
    path: '/add-issuer',
    element: (
      <RoutePermissionChecker>
        <AddIssuerPage />
      </RoutePermissionChecker>
    ),
  },
  {
    path: '/remove-issuer',
    element: (
      <RoutePermissionChecker>
        <RemoveIssuerPage />
      </RoutePermissionChecker>
    ),
  },
  {
    path: '/invalidate-certificate',
    element: (
      <RoutePermissionChecker>
        <InvalidateCertPage />
      </RoutePermissionChecker>
    ),
  },
  {
    path: '/certificate-list',
    element: (
      <RoutePermissionChecker>
        <IssuedCertsPage />
      </RoutePermissionChecker>
    ),
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
