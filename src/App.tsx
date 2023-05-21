import React, { useState } from 'react';
import { CellGrid } from './components/CellGrid/CellGrid';
import { buildBaseGrid } from './gamelogic/liveGrid';
import { useGameLoop } from './gamelogic/gameLoop';




const App: React.FC = () => {
    const initalColourGrid = buildBaseGrid();
    const [colourGrid, setColourGrid] = useState(initalColourGrid)
    const [onKeyDown] = useGameLoop({ gridSetter: setColourGrid, tickRate: 1000 })
    return (
        <div onKeyDown={onKeyDown} tabIndex={0}>
            <CellGrid rows={18} cols={10} defaultColor={0} colorGrid={colourGrid} />
        </div>
    );
};

export default App;