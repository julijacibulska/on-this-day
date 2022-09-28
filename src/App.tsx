import React from "react";
import { Wiki } from "./features/wiki/Wiki";
import Modal from "react-modal";
import { StyledContainer } from "components/styled/global";

Modal.setAppElement("#root");

function App() {
  return (
    <StyledContainer className="App">
      <Wiki />
    </StyledContainer>
  );
}

export default App;
