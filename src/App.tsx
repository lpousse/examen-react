import React, { useEffect, useState } from 'react';
import './App.scss';
import Header from './components/Header';
import UnitInterface from './interfaces/UnitInterface';
import { getUnits } from './services/UnitsService';
import { Tabs, Tab } from 'react-bootstrap';
import UnitTab from './components/UnitTab';
import LoginForm from './components/LoginForm';
import 'bootstrap/dist/js/bootstrap.min.js';
import StateInterface from './interfaces/StateInterface';
import { getStates } from './services/StatesService';
import HomeTab from './components/HomeTab';
import AddUnitForm from './components/AddUnitForm';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>('home');

    const [units, setUnits] = useState<UnitInterface[]>([]);
    useEffect(() => {
        (async() => {
            setUnits(await getUnits());
            setActiveTab('home');
        })();
    }, []);

    const [states, setStates] = useState<StateInterface[]>([]);
    useEffect(() => {
        (async() => {setStates(await getStates());})();
    }, []);

    return (
        <div className="App">
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />
            <div className='App-body container-fluid'>
                {isLoggedIn ?
                <>
                    <Tabs activeKey={activeTab} onSelect={(k) => { if (k) setActiveTab(k)}}>
                        <Tab tabClassName='bg-secondary text-black' eventKey={'home'} title='Home'>
                            <HomeTab units={units} states={states} />
                        </Tab>
                        {units.map(unit => <Tab key={`unit-tab-${unit.id}`}  eventKey={`unit-tab-${unit.id}`} title={unit.name}>
                                <UnitTab unit={unit} setUnits={setUnits} states={states} isAdminMode={isAdminMode} setActiveTab={setActiveTab} />
                            </Tab>)}
                        <Tab tabClassName='bg-primary text-white fs-4 pt-0 pb-1' eventKey={'add'} title="+">
                            <AddUnitForm setUnits={setUnits} setActiveTab={setActiveTab} />
                        </Tab>
                    </Tabs>
                </>
                :
                <LoginForm setIsLoggedIn={setIsLoggedIn} />
                }
            </div>
        </div>
    );
}

export default App;
