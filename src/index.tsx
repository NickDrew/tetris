
import App from './App';
import './index.css';
import { createRoot } from 'react-dom/client';

const domNode = document.getElementById('root');
if (domNode) {
    const root = createRoot(domNode);
    root.render(<App />);
}
else {
    console.error("Error getting root node from document")
}


