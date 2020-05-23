import React from 'react';
import Main from "./components/MainContainer";
import './App.css';
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <div>
          <Main/>
        </div>
      </BrowserRouter>
  );
}

export default App;
