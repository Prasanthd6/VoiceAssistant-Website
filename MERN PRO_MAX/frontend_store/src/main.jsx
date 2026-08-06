import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from './redux/store';
import { Provider } from "react-redux";

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
    
//     <App />
//   </React.StrictMode>,
// );
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);



//////////////////////////////



// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import { BrowserRouter } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <AuthProvider>
//         <App />
//       </AuthProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );
