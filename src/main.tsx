import { createRoot } from 'react-dom/client'
import "./utils/auth.ts";
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <App />
)
