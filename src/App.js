import React from 'react';
import './index.css';
import Header from './components/Header';
import Title from './components/Title';
import CoverImage from './components/CoverImage';
import InfoSection from './components/InfoSection';

function App() {
  return (
    <div className='App'>
      <Header />
      <Title/>
      <CoverImage />
      <InfoSection />
    </div>
  );
}



export default App;
