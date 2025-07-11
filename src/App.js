import React, { useState } from 'react';
import './App.css';

function App() {
  const [code, setCode] = useState('// start coding!');
  const [output, setOutput] = useState('');
  const [previewContent, setPreviewContent] = useState('');

  const runCode = () => {
    try {
      // eslint-disable-next-line no-eval
      const result = eval(code);
      setOutput(String(result));
    } catch (error) {
      setOutput(String(error));
    }
  };

  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);
    setPreviewContent(newCode); // Update preview content
  };

  return (
    <div className="ide">
      <div className="sidebar">
        <h2>Files</h2>
        <ul>
          <li>index.js</li>
          <li>App.js</li>
          <li>index.html</li>
        </ul>
      </div>
      <div className="editor-container">
        <div className="toolbar">
          <button onClick={runCode}>Run</button>
        </div>
        <textarea
          className="editor"
          value={code}
          onChange={handleCodeChange}
        />
        <div className="output">{output}</div>
      </div>
      <div className="preview">
        <h2>Preview</h2>
        <pre>{previewContent}</pre>
      </div>
      <div className="right-menu">
        <h2>Settings</h2>
        <ul>
          <li>Theme</li>
          <li>Font Size</li>
          <li>Keybindings</li>
        </ul>
      </div>
    </div>
  );
}

export default App;