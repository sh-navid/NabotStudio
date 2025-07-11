import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Editor from './components/Editor';
import Output from './components/Output';
import Preview from './components/Preview';
import RightMenu from './components/RightMenu';
import Sidebar from './components/Sidebar';
import Toolbar from './components/Toolbar';

function IDE() {
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

function LandingPage() {
    return (
        <div className="landing-page">
            <h1>Welcome to NabotStudio</h1>
            <p>Your online code editing environment.</p>
            <Link to="/studio">
                <button>Show Demo</button>
            </Link>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/studio" element={<IDE />} />
            </Routes>
        </Router>
    );
}

export default App;