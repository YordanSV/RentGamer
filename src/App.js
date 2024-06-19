import React from 'react';
import './index.css';
import Header from './components/Header';
import Title from './components/Title';
import CoverImage from './components/CoverImage';
import InfoSection from './components/InfoSection';
import GameSection from './components/GameSection';

function App() {
  return (
    <div className='App'>
      <Header />
      <Title/>
      <CoverImage />
      <InfoSection />
      <GameSection />
    </div>
  );
}



export default App;
