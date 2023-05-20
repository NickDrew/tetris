import React from 'react';
import { CellGrid } from './components/CellGrid/CellGrid';

const App: React.FC = () => {
    return (
        <div>
            <CellGrid rows={18} cols={10} color={0} />
        </div>
    );
};

export default App;