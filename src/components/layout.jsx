import React from 'react';
import Navbar from '../components/navbar';
import { Outlet } from 'react-router-dom';

export const Layout = ({children}) => {
  return (
    <div className="layout">
      <Navbar/>
      <Outlet />
    </div>
  )
}

export default Layout;