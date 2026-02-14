import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import GameCard from './GameCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const StyledSlider = styled(Slider)`
  width: 100%;
  position: relative;
  padding: 0;
  margin: 0 auto;

  .slick-list {
    margin: 0;
    padding: 0 45px;
    border-radius: 8px;
    width: 100%;
    box-sizing: border-box;
  }

  .slick-slide {
    padding: 0 10px;
    height: 100%;
    transition: transform 0.3s ease;
  }

  .slick-slide > div {
    height: 100%;
  }

  .slick-track {
    display: flex;
  }

  .slick-prev,
  .slick-next {
    width: 40px;
    height: 40px;
    z-index: 2;
    transition: all 0.3s ease;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 4px;

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }

    &::before {
      font-size: 20px;
    }
  }

  .slick-prev {
    left: 6px;
  }

  .slick-next {
    right: 6px;
  }

  .slick-dots {
    bottom: -40px;
    display: flex !important;
    justify-content: center;
    gap: 10px;

    li {
      margin: 0;
    }

    li button:before {
      font-size: 10px;
      color: #7b7b7b;
      opacity: 0.6;
      transition: all 0.3s ease;
    }

    li.slick-active button:before {
      color: white;
      opacity: 1;
      transform: scale(1.2);
    }
  }

  /* Desktop - 1920px y más */
  @media (min-width: 1920px) {
    .slick-list {
      padding: 0 50px;
    }

    .slick-slide {
      padding: 0 12px;
    }
  }

  /* Tablets y pantallas medianas */
  @media (max-width: 1440px) {
    .slick-list {
      padding: 0 45px;
    }

    .slick-slide {
      padding: 0 10px;
    }
  }

  /* iPad landscape */
  @media (max-width: 1024px) {
    .slick-list {
      padding: 0 40px;
    }

    .slick-slide {
      padding: 0 8px;
    }

    .slick-prev,
    .slick-next {
      width: 36px;
      height: 36px;
    }
  }

  /* iPad y tablets */
  @media (max-width: 768px) {
    .slick-list {
      padding: 0 35px;
    }

    .slick-slide {
      padding: 0 6px;
    }

    .slick-prev,
    .slick-next {
      width: 32px;
      height: 32px;

      &::before {
        font-size: 16px;
      }
    }

    .slick-dots {
      bottom: -35px;
      gap: 8px;

      li button:before {
        font-size: 8px;
      }
    }
  }

  /* Teléfonos grandes */
  @media (max-width: 600px) {
    .slick-list {
      padding: 0 !important;
      margin: 0 auto;
      overflow: hidden;
    }

    .slick-slide {
      padding: 0;
    }

    .slick-slide > div {
      width: 100%;
      display: flex;
      justify-content: center;
      padding: 0 15px;
      box-sizing: border-box;
    }

    .slick-track {
      display: flex;
      justify-content: center;
      margin: 0 auto;
    }

    .slick-prev,
    .slick-next {
      display: none;
    }

    .slick-dots {
      bottom: -32px;
      gap: 6px;

      li button:before {
        font-size: 8px;
      }
    }
  }

  /* Teléfonos pequeños */
  @media (max-width: 480px) {
    .slick-list {
      padding: 0 !important;
      margin: 0 auto;
      overflow: hidden;
    }

    .slick-slide {
      padding: 0;
    }

    .slick-slide > div {
      width: 100%;
      display: flex;
      justify-content: center;
      padding: 0 15px;
      box-sizing: border-box;
    }

    .slick-track {
      display: flex;
      justify-content: center;
      margin: 0 auto;
    }

    .slick-prev,
    .slick-next {
      display: none;
    }

    .slick-dots {
      bottom: -28px;
      gap: 4px;

      li button:before {
        font-size: 6px;
      }
    }
  }

  /* Teléfonos muy pequeños */
  @media (max-width: 360px) {
    .slick-list {
      padding: 0 !important;
      margin: 0 auto;
      overflow: hidden;
    }

    .slick-slide {
      padding: 0;
    }

    .slick-slide > div {
      width: 100%;
      display: flex;
      justify-content: center;
      padding: 0 10px;
      box-sizing: border-box;
    }

    .slick-track {
      display: flex;
      justify-content: center;
      margin: 0 auto;
    }

    .slick-prev,
    .slick-next {
      display: none;
    }

    .slick-dots {
      bottom: -24px;

      li button:before {
        font-size: 5px;
      }
    }
  }

  /* Animación de carga */
  animation: fadeIn 0.5s ease-in;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  adaptiveHeight: false,
  swipeToSlide: true,
  arrows: true,
  variableWidth: false,
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        arrows: true
      }
    },
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        arrows: true
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
        dots: true,
        centerMode: false
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
        dots: true,
        centerMode: false
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
