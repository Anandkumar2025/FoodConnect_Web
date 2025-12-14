import React from 'react'
import Nav from './pages/Nav'
import Footer from './pages/Footer'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
      <Nav/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Layout;
