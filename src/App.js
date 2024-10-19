import React from 'react';
import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/indexpage/IndexPage.js";
import Layout from './pages/Layout/Layout.js';

function App() {
    return (
          <Routes>
            <Route path="/" element={<Layout/>}>
            <Route index element={<IndexPage/>}></Route>
            </Route>
          </Routes>    
  );
}

export default App;

