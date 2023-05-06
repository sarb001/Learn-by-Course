import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import  { ChakraProvider  ,ColorModeScript,theme } from '@chakra-ui/react';
// import store from './Redux/store';

import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
       
       
        <ChakraProvider theme = {theme}>
              <App />
          </ChakraProvider>
 
);

