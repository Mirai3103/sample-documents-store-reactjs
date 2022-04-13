// scroll bar
import 'simplebar/src/simplebar.css';
import ReactGA from 'react-ga';

import ReactDOM from 'react-dom';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// contexts
import { SettingsProvider } from './contexts/SettingsContext';
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext';
//
import App from './App';
import { StoreProvider } from './store';
// ----------------------------------------------------------------------

ReactGA.initialize('G-PLZ6F33ZJ3');
ReactGA.pageview(window.location.pathname + window.location.search);
ReactDOM.render(
  <StrictMode>
    <HelmetProvider>
      <SettingsProvider>
        <CollapseDrawerProvider>
          <BrowserRouter>
            <StoreProvider>
              <App />
            </StoreProvider>
          </BrowserRouter>
        </CollapseDrawerProvider>
      </SettingsProvider>
    </HelmetProvider>
  </StrictMode>,
  document.getElementById('root')
);
