import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Login from './components/Login';
import Admin from './components/Admin';
import Listings from './components/Listings';
import { Container } from 'react-bootstrap';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RecoilRoot>
    <BrowserRouter>
        <Routes>
          <Route path='login' element={<Login />} />
          <Route path='admin' element={<Admin />} />
          <Route path='/' element={<Listings />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);


reportWebVitals();
