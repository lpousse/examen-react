import React, { useEffect, useState } from 'react';
import './App.scss';
import Header from './components/Header';
import UnitInterface from './interfaces/UnitInterface';
import { getUnits } from './services/UnitsService';
import Tab from './components/Tab';
import LoginForm from './components/LoginForm';
import Pane from './components/Pane';
import 'bootstrap/dist/js/bootstrap.min.js';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<number>(0);

    const [units, setUnits] = useState<UnitInterface[]>([]);
    useEffect(() => {
        (async() => {
            const fetched_units = await getUnits();
            setUnits([{id: 0, name: "Home"}, ...fetched_units]);
        })();
    }, []);

    return (
        <div className="App">
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />
            <div className='App-body container'>
                {isLoggedIn ?
                <>
                    <ul className="nav nav-tabs">
                        {units.map(unit => <Tab key={`unit-tab-${unit.id}`} unit={unit} activeTab={activeTab} setActiveTab={setActiveTab} />)}
                    </ul>
                    <div className='tab-content'>
                        {units.map(unit => <Pane key={`unit-pane-${unit.id}`} unit={unit} activeTab={activeTab} setActiveTab={setActiveTab} />)}
                    </div>
                </>
                :
                <LoginForm setIsLoggedIn={setIsLoggedIn} />
                }
            </div>
        </div>
    );
}

export default App;
