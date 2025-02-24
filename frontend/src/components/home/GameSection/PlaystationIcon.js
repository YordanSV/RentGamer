import React from "react";
import styled from "styled-components";
import { FaPlaystation } from "react-icons/fa";

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #0044ff, #001b77);
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease-in-out;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
  }
`;

const Icon = styled(FaPlaystation)`
  color: white;
  transition: transform 0.2s ease-in-out;

  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

const PlaystationIcon = () => {
  return (
    <IconContainer>
      <Icon size={60} />
    </IconContainer>
  );
};

export default PlaystationIcon;
