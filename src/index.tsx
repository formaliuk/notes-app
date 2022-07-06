import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {App} from './components/App';
import {DBProvider} from "./components/DBProvider";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <DBProvider>
      <App />
    </DBProvider>
  </React.StrictMode>
);

