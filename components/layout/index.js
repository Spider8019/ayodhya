import React from 'react';
import Navbar from '../global/Navbar';
import Footer from '../global/Footer';

const Layout = ({children}) => {
  return <>
          <Navbar/>
              {children}
          <Footer/>   
        </>;
};

export default Layout;
