import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { ContentProvider } from './context/ContentContext';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ContentProvider>
        <App />
      </ContentProvider>
    </HashRouter>
  </StrictMode>
);
