import React from "react";

function Toolbar({ runCode, newTab }) {
  return (
    <div className="toolbar">
      <button onClick={runCode}>Desktop</button>
      <button onClick={runCode}>Tablet</button>
      <button onClick={runCode}>Mobile</button>
      <button onClick={runCode}>Responsive</button>
      <span> | </span>
      <button onClick={runCode}>Run</button>
      <button onClick={newTab}>Screen</button>
    </div>
  );
}

export default Toolbar;
