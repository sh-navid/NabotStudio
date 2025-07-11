import React from 'react';

function Toolbar({ runCode }) {
  return (
    <div className="toolbar">
      <button onClick={runCode}>Run</button>
    </div>
  );
}

export default Toolbar;