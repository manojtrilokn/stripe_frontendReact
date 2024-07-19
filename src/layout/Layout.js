import React from 'react';
import Header from './header/Header';
import { Outlet } from 'react-router-dom';
import stylesheet from './layout.module.css';

const Layout = () => {
    return (
        <div className={stylesheet.container}>
            <div  className={stylesheet.header}>
                <Header />
            </div>
            <div className={stylesheet.outlet}>
                <Outlet />
            </div>
        </div>
    )
};

export default Layout;
