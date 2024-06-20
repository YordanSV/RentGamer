import React from 'react';
import Header from './components/Header/Header';
import InfoSection from './components/InfoSection';
import GameSection from './components/GameSection/GameSection';
import CoverImage from './components/CoverImage';
import Footer from './components/Footer/Footer';
import CirclesSection from './components/CirclesSection';

function App() {
  return (
    <div className='App'>
      <Header />
      <CoverImage/>
      <InfoSection />
      <GameSection />
      <CirclesSection />
      <Footer/>
    </div>
  );
}


export default App;
