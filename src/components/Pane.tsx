import React from 'react';
import UnitInterface from '../interfaces/UnitInterface';
import './Pane.scss';

type PaneProps = {
	unit: UnitInterface;
	activeTab: number;
    setActiveTab: React.Dispatch<React.SetStateAction<number>>;
};

function Pane({unit, activeTab, setActiveTab}: PaneProps) {

	const handleTabClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setActiveTab(unit.id);
    };

    return (
        <div className="tab-pane fade show" id={`unit-pane-${unit.id}`} role="tabpanel">
			<p>{unit.name}</p>
		</div>
    );
};

export default Pane;