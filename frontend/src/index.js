import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import  { ChakraProvider  ,ColorModeScript,theme } from '@chakra-ui/react';
import { Provider as ReduxProvider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
        <ReduxProvider  store = {store}>
            <ChakraProvider theme = {theme}>
                <App />
            </ChakraProvider>
        </ReduxProvider>
);

