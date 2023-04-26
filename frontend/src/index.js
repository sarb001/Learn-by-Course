import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import  { ChakraProvider  ,ColorModeScript,theme } from '@chakra-ui/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      
          <ChakraProvider theme = {theme}>
              <App />
          </ChakraProvider>
 
);

