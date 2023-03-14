import React from 'react';
import logo from '../resources/amuro-ray-logo.png';
import headerSplit from '../resources/header-split.png'
import './Header.scss';

type HeaderProps = {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    isAdminMode: boolean;
    setIsAdminMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header({isLoggedIn, setIsLoggedIn, isAdminMode, setIsAdminMode}: HeaderProps) {
    return (
        <header className="App-header mb-5">
            <div className='row h-100 d-flex align-items-center'>
                <div className='col-8 ps-5 h-100 d-flex justify-content-start align-items-center'>
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1>Amuro's MS management App</h1>
                </div>
                <div className='App-menu col-4 ps-0 pe-5 h-100 d-flex justify-content-center align-items-center'>
                    <img src={headerSplit} className="Header-split me-auto" alt="headerSplit" />
                    { isLoggedIn ?
                        <>
                            <button className='btn btn-warning m-3' onClick={() => setIsAdminMode(val => val = !val)} >{isAdminMode ? "Disable" : "Enable"} admin mode</button>
                            <button className='btn btn-danger mr-5'onClick={() => setIsLoggedIn(false)}>Logout</button>
                        </>
                        :
                        <></>        
                    }
                </div>
            </div>
        </header>
    );
}

export default Header;