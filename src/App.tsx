import React from 'react';
import { CellGrid } from './components/CellGrid/CellGrid';

const App: React.FC = () => {
    const colourGrid: number[][] = [[], [], [], [], [], [], [], [], [], []]
    return (
        <div>
            <CellGrid rows={18} cols={10} defaultColor={0} colorGrid={colourGrid} />
        </div>
    );
};

export default App;