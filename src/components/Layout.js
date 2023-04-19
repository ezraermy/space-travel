import React from 'react';
import Navbar from 'components/Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => (
  <div data-testid="layout" className="wrapper">
    <Navbar />
    <Outlet />
  </div>
);

export default Layout;
