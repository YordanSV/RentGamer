import React from 'react';
import CirclesSection from '../components/home/CirclesSection';
import InfoSection from '../components/home/InfoSection';
import GameSection from '../components/home/GameSection/GameSection';
import CoverImage from '../components/home/CoverImage';

const HomePage = () => {
  return (
    <div>
      <CoverImage/>
      <InfoSection />
      <GameSection />
      <CirclesSection />
    </div>
  );
};

export default HomePage;
