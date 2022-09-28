import styled from "styled-components";
import Modal from "react-modal";

export const StyledModal = styled(Modal)`
  width: 600px;
  max-width: 80%;
  background: ${({ theme }) => theme.colors.surfaceBg};
  border: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  border-radius: ${({ theme }) => theme.borderRadius.m};
  padding: ${({ theme }) => `${theme.spacings.m}  ${theme.spacings.l}`};
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const StyledModalTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.m};
  margin-top: 0;
`;

export const StyledModalText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.s};
  margin-bottom: ${({ theme }) => theme.spacings.m};
`;

export const StyledModalButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
