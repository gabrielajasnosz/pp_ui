import React from 'react'
import './App.css'
import { MainPage } from './pages/MainPage/MainPage'
import { MetaMaskContextProvider } from './hooks/useMetaMask'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CheckCertPage } from './pages/CheckCertPage/CheckCertPage'
import { AddCertPage } from './pages/AddCertPage/AddCertPage'

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
])

function App() {
  return (
    <MetaMaskContextProvider>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </MetaMaskContextProvider>
  )
}

export default App
