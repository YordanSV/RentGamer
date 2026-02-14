import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import GameCard from './GameCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const StyledSlider = styled(Slider)`
  width: 100%;
  position: relative;
  padding: 0 44px;

  .slick-list {
    margin: 0 -10px;
    border-radius: 8px;
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
    padding: 0 50px;

    .slick-slide {
      padding: 0 12px;
    }

    .slick-list {
      margin: 0 -12px;
    }
  }

  /* Tablets y pantallas medianas */
  @media (max-width: 1440px) {
    padding: 0 40px;

    .slick-slide {
      padding: 0 10px;
    }

    .slick-list {
      margin: 0 -10px;
    }
  }

  /* iPad landscape */
  @media (max-width: 1024px) {
    padding: 0 35px;

    .slick-slide {
      padding: 0 8px;
    }

    .slick-list {
      margin: 0 -8px;
    }

    .slick-prev,
    .slick-next {
      width: 36px;
      height: 36px;
    }
  }

  /* iPad y tablets */
  @media (max-width: 768px) {
    padding: 0 30px;

    .slick-list {
      margin: 0 -6px;
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
    padding: 0 20px;

    .slick-list {
      margin: 0 -4px;
    }

    .slick-slide {
      padding: 0 4px;
    }

    .slick-prev,
    .slick-next {
      width: 30px;
      height: 30px;

      &::before {
        font-size: 14px;
      }
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
    padding: 0 16px;

    .slick-list {
      margin: 0 -3px;
      padding: 0 !important;
    }

    .slick-slide {
      padding: 0 3px;
    }

    .slick-slide > div {
      width: 100%;
    }

    .slick-track {
      display: flex;
      justify-content: center;
    }

    .slick-prev,
    .slick-next {
      width: 28px;
      height: 28px;

      &::before {
        font-size: 12px;
      }
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
    padding: 0 12px;

    .slick-list {
      margin: 0 -2px;
    }

    .slick-slide {
      padding: 0 2px;
    }

    .slick-prev,
    .slick-next {
      width: 26px;
      height: 26px;
      opacity: 0.8;

      &::before {
        font-size: 10px;
      }
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
  slidesToScroll: 1,
  adaptiveHeight: true,
  swipeToSlide: true,
  arrows: true,
  variableWidth: true,
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1920,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        arrows: true,
        variableWidth: false,
        centerMode: false
      }
    },
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        arrows: true,
        variableWidth: false,
        centerMode: false
      }
    },
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        arrows: true,
        variableWidth: false,
        centerMode: false
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        variableWidth: false,
        centerMode: false,
        centerPadding: "10px"
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1.5,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        variableWidth: false,
        centerMode: true,
        centerPadding: "20px"
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        variableWidth: false,
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
