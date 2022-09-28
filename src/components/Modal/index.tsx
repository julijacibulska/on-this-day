import React from "react";
import {
  StyledModalTitle,
  StyledModalText,
  StyledModal,
  StyledModalButtonContainer,
} from "./_styled";

interface Props {
  title: string;
  message: string | undefined;
  isOpen: boolean;
  closeModal: () => void;
}

export const Modal = ({
  title,
  message,
  isOpen,
  closeModal,
}: Props): JSX.Element => {
  return (
    <StyledModal isOpen={isOpen} onRequestClose={closeModal}>
      <StyledModalTitle>{title}</StyledModalTitle>
      {message && <StyledModalText>{message}</StyledModalText>}
      <StyledModalButtonContainer>
        <button onClick={closeModal}>Ok</button>
      </StyledModalButtonContainer>
    </StyledModal>
  );
};
