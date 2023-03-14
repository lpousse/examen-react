import React from 'react';
import UnitInterface from '../interfaces/UnitInterface';
import './Tab.scss';

type TabProps = {
	unit: UnitInterface;
	activeTab: number;
    setActiveTab: React.Dispatch<React.SetStateAction<number>>;
};

function Tab({unit, activeTab, setActiveTab}: TabProps) {

	const handleTabClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setActiveTab(unit.id);
    };

    return (
        <li className="nav-item">
            <button className={unit.id == activeTab ? "nav-link active" : "nav-link"} onClick={handleTabClick}>{unit.name}</button>
        </li>
    );
};

export default Tab;