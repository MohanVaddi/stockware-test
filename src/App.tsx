import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Table from './components/Table';
import Warehouse from './components/Warehouse';

interface AppProps {}

const App: React.FC<AppProps> = ({}) => (
    <Routes>
        <Route path='/' element={<Table />} />
        <Route path=':warehouseId' element={<Warehouse />} />
    </Routes>
);



export default App;
