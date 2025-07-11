import React from 'react';

function Preview({ previewContent }) {
  return (
    <div className="preview">
      <h2>Preview</h2>
      <pre>{previewContent}</pre>
    </div>
  );
}

export default Preview;