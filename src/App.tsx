import React from "react";
import { Wiki } from "./features/wiki/Wiki";
import Modal from "react-modal";

Modal.setAppElement("#root");

function App() {
  return (
    <div className="App">
      <Wiki />
    </div>
  );
}

export default App;
