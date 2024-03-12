import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

//configuration
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';

//application
import App from './app/App';

//styles
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "react-toastify/dist/ReactToastify.css";
import './static/assets/styles/styles.scss';

// import { ThemeSwitcher } from 'react-bootswatch-theme-switcher';

// const validThemes = ['light', 'dark'];

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    {/* <ThemeSwitcher storeThemeKey="theme" defaultTheme="light" themeRoot="assets" themeOptions={ validThemes }> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* </ThemeSwitcher> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

//NOTE: Theme Switcher not implemented