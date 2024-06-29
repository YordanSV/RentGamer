import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import GameCard from './GameCard';

const CarouselContainer = styled.div`
  width: 80%;
  margin: auto;
  margin-bottom: 40px;
`;

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

const GameCarousel = ({ games, onAddToCart }) => {
  return (
    <Slider {...settings}>
      {games.map(game => (
        <GameCard key={game.id} game={game} onAddToCart={onAddToCart} />
      ))}
    </Slider>
  );
};

export default GameCarousel;
