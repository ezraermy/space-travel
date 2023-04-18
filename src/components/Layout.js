import React from 'react';
import Navbar from 'components/Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => (
  <div className="wrapper">
    <Navbar />
    <Outlet />
  </div>
);

export default Layout;
