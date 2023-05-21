import React, { ReducerAction, useEffect, useReducer, useState } from 'react';
import { CellGrid } from './components/CellGrid/CellGrid';
import { buildliveGrid } from './gamelogic/liveGrid';
import { useGameLoop } from './gamelogic/gameLoop';




const App: React.FC = () => {
    const initalColourGrid = buildliveGrid({ shapey: 0 });
    const [colourGrid, setColourGrid] = useState(initalColourGrid.nextGrid)
    useGameLoop({ gridSetter: setColourGrid, tickRate: 2000 })
    return (
        <div>
            <CellGrid rows={18} cols={10} defaultColor={0} colorGrid={colourGrid} />
        </div>
    );
};

export default App;