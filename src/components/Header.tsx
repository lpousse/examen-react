import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import logo from '../resources/amuro-ray-logo.png';
import headerSplit from '../resources/header-split.png'
import { faGear } from '@fortawesome/free-solid-svg-icons';
import './Header.scss';

type HeaderProps = {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    isAdminMode: boolean;
    setIsAdminMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header({isLoggedIn, setIsLoggedIn, isAdminMode, setIsAdminMode}: HeaderProps) {
    return (
        <header className="App-header mb-5 bg-secondary">
            <div className='row h-100 d-flex align-items-center'>
                <div className='col-8 ps-5 h-100 d-flex justify-content-start align-items-center'>
                    <img src={logo} className="App-logo me-3" alt="logo" />
                    <h1>Amuro's MS management App</h1>
                </div>
                <div className='App-menu col-4 ps-0 pe-5 h-100 d-flex justify-content-center align-items-center bg-primary'>
                    <img src={headerSplit} className="Header-split me-auto" alt="headerSplit" />
                    { isLoggedIn ?
                        <>
                            <button className='btn btn-warning m-3' onClick={() => setIsAdminMode(val => val = !val)} >
                                <FontAwesomeIcon className='me-2' icon={faGear} />
                                {isAdminMode ? "Disable" : "Enable"} admin mode
                            </button>
                            <button className='btn btn-danger text-white mr-5'onClick={() => setIsLoggedIn(false)}>Logout</button>
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