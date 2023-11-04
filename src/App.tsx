import logo from './logo.svg';
import React, {useEffect, useState}from 'react';
import './App.css';
import {getBalance, getCertificate} from "./ethereum/SepoliaService";
import { MainPage } from "./pages/MainPage/MainPage";

function App() {
  return (
    <div className="App">
      <MainPage />
    </div>
  );
}

export default App;
