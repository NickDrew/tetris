
import App from './App'
import './index.css'
import React from 'react'
import { createRoot } from 'react-dom/client'

const domNode = document.getElementById('root')
if (domNode != null) {
  const root = createRoot(domNode)
  root.render(<App />)
} else {
  console.error('Error getting root node from document')
}
