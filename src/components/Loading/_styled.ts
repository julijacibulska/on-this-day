import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from { 
    transform: rotate(0deg); 
  }
  to { 
    transform: rotate(360deg); 
  }
`;

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
    width: 60px;
    height: 60px;
    left: 50%;
    top: 50%;
    transform: translate(-50%);
    border-radius: 50%;
    border: 5px solid ${({ theme }) => theme.colors.primary};
    border-left-color: transparent;
    z-index: 2;
    animation: ${spin} 2s infinite ease-in-out;
  }
`;
