import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import GameCard from './GameCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const StyledSlider = styled(Slider)`
  .slick-list {
    margin: 0 -8px;
  }

  .slick-slide {
    padding: 0 8px;
  }

  .slick-dots li button:before {
    color: #7b7b7b; /* Cambia esto al color que desees */
  }

  .slick-dots li.slick-active button:before {
    color: white; /* Cambia esto al color que desees para el dot activo */
  }

  @media (max-width: 768px) {
    .slick-list {
      margin: 0 -6px;
    }

    .slick-slide {
      padding: 0 6px;
    }
  }
`;

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  adaptiveHeight: true,
  swipeToSlide: true,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
      }
    }
  ]
};

const GameCarousel = ({ games }) => {

  return (
    <StyledSlider {...settings}>
      {games.map(game => (
        <GameCard key={game.id} game={game} />
      ))}
    </StyledSlider>
  );
};

export default GameCarousel;
