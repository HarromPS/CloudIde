import React from 'react';
import Header from './Header';
import {Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <>
      {/* activity bar*/}
      <Header/>

      {/* Deshtop child components */}
      <Outlet/>
    </>
  )
}

export default Dashboard;