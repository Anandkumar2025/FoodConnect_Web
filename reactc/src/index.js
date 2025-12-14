import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { createBrowserRouter, createRoutesFromElements,  Route, RouterProvider } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Layout from './Layout';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Restdash from './pages/Restdash';
import Donate from './pages/Donate';
import Ngodash  from './pages/Ngodash';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return isLoggedIn ? children : <Navigate to="/signin" />;
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='home' element={<Home/>}/>
      {/* <Route path='restdash' element={<Restdash />} /> */}
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
      <Route path='signup' element={<Signup />} />
      <Route path='signin' element={<Signin />} />
      <Route path='donate' element={<Donate />} />
      {/* <Route path='ngodash' element={<Ngodash />} /> */}
      <Route path="/ngodash" element={<ProtectedRoute><Ngodash /></ProtectedRoute>} />
      <Route path="/restdash" element={<ProtectedRoute><Restdash /></ProtectedRoute>} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

 
