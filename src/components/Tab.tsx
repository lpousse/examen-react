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
        <li className="nav-item" role='presentation'>
            <button className={unit.id == activeTab ? "nav-link active" : "nav-link"} id={`unit-tab-${unit.id}`} data-bs-toggle="tab"
				data-bs-target={`#unit-tab-${unit.id}`} type="button" role="tab" >{unit.name}</button>
        </li>
    );
};

export default Tab;