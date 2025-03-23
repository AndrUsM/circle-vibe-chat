import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './App';

import './i18n';

import './tailwind.css';
import './styles/index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

