"use client"

import React from 'react'
import Nav from './Nav'
import MobileNav from './MobileNav'
import Home from '../Home'

const NavWrapper = () => {
    const [showNav,setShowNav]=React.useState(false);
    const closeNav=()=>{
        setShowNav(false);
    }
    const openNav=()=>{
        setShowNav(true);
    }
  return (
    <div>
        <Nav openNav={openNav}  />
        <MobileNav showNav={showNav} closeNav={closeNav} />
       
      
    </div>
  )
}

export default NavWrapper