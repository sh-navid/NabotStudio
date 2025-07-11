import React, { useState } from 'react';
import './App.css';
import Editor from './components/Editor';
import Output from './components/Output';
import Preview from './components/Preview';
import RightMenu from './components/RightMenu';
import Sidebar from './components/Sidebar';
import Toolbar from './components/Toolbar';

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
      <Sidebar />
      <div className="editor-container">
        <Toolbar runCode={runCode} />
        <Editor code={code} handleCodeChange={handleCodeChange} />
        <Output output={output} />
      </div>
      <Preview previewContent={previewContent} />
      <RightMenu />
    </div>
  );
}

export default App;