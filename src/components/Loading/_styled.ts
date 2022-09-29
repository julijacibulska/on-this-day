import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from { 
    transform: rotate(0deg); 
  }
  to { 
    transform: rotate(360deg); 
  }
`;

const loaderRadius = 20;

export const StyledLoadingOverlay = styled.div`
  position: fixed;
  background: rgb(255, 255, 255, 0.3);
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;

  ::before {
    content: "";
    display: block;
    position: absolute;
    width: ${loaderRadius * 2}px;
    height: ${loaderRadius * 2}px;
    left: calc(50% - ${loaderRadius}px);
    top: calc(50% - ${loaderRadius}px);
    border-radius: 50%;
    border: 5px solid ${({ theme }) => theme.colors.primary};
    border-left-color: transparent;
    z-index: 2;
    animation: ${spin} 2s infinite ease-in-out;
  }
`;
