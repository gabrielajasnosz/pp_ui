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
import { AddCertBulkPage } from './pages/AddCertBulkPage/AddCertBulkPage';
import { AddAdminPage } from './pages/AddAdminPage/AddAdminPage';
import { RemoveAdminPage } from './pages/RemoveAdminPage/RemoveAdminPage';

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
    path: '/add-certificate-bulk',
    element: (
      <RoutePermissionChecker>
        <AddCertBulkPage />
      </RoutePermissionChecker>
    ),
  },
  {
    path: '/add-issuer',
    element: (
      <RoutePermissionChecker permission="Admin">
        <AddIssuerPage />
      </RoutePermissionChecker>
    ),
  },
  {
    path: '/remove-issuer',
    element: (
      <RoutePermissionChecker permission="Admin">
        <RemoveIssuerPage />
      </RoutePermissionChecker>
    ),
  },
  {
    path: '/add-admin',
    element: (
      <RoutePermissionChecker permission="Owner">
        <AddAdminPage />
      </RoutePermissionChecker>
    ),
  },
  {
    path: '/remove-admin',
    element: (
      <RoutePermissionChecker permission="Owner">
        <RemoveAdminPage />
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
