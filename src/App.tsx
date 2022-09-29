import React from "react";
import { Wiki } from "./features/wiki/Wiki";
import { StyledContainer } from "components/styled/global";

function App() {
  return (
    <StyledContainer className="App">
      <Wiki />
    </StyledContainer>
  );
}

export default App;
