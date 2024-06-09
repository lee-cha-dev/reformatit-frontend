import React from 'react';
import {
  ChakraProvider,
  // theme,
} from '@chakra-ui/react';
import ImageUploader from "./components/ImageConverter";
import "./styles/App.css"
import Footer from "./components/Footer";
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import theme from "./theme"
import Maintenance from './components/Maintenance';

function App() {
  return (
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <div className="App">
              {/*<Header />*/}
              <div className="App-content">
                <Routes>
                  <Route path="/" element={<Maintenance />} />
                  {/*<Route path="/" element={<ImageUploader />} />*/}
                  <Route path="/images" element={<ImageUploader />} />
                  {/*<Route path="/videos" element={<ImageUploader />} />*/}
                </Routes>
              </div>
              {/*<Footer />*/}
          </div>
        </BrowserRouter>
      </ChakraProvider>
  );
}

export default App;
