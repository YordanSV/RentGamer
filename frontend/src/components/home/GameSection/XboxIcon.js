import React from "react";
import styled from "styled-components";
import { FaXbox } from "react-icons/fa";

// Styled Components
const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #107c10, #005500);
  border-radius: 50%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease-in-out;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
  }
`;

const Icon = styled(FaXbox)`
  color: white;
  transition: transform 0.2s ease-in-out;

  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

const XboxIcon = () => {
  return (
    <IconContainer>
      <Icon size={40} />
    </IconContainer>
  );
};

export default XboxIcon;
