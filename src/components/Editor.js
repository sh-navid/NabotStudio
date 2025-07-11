import React from 'react';

function Editor({ code, handleCodeChange }) {
  return (
    <textarea
      className="editor"
      value={code}
      onChange={handleCodeChange}
    />
  );
}

export default Editor;