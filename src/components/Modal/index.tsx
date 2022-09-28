import React from "react";
import ReactModal from "react-modal";
import { StyledModalTitle, StyledModalText } from "./_styled";

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
    <ReactModal isOpen={isOpen} onRequestClose={closeModal}>
      <StyledModalTitle>{title}</StyledModalTitle>
      {message && <StyledModalText>{message}</StyledModalText>}
      <button onClick={closeModal}>Ok</button>
    </ReactModal>
  );
};
