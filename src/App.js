/* */
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Editor from './components/Editor';
import Output from './components/Output';
import Preview from './components/Preview';
import RightMenu from './components/RightMenu';
import Sidebar from './components/Sidebar';
import Toolbar from './components/Toolbar';

// Mock Logo Component (replace with your actual logo)
const Logo = () => (
    <div className="logo">
        <img src='/logo512.png' alt='NabotStudio Logo'/>
    </div>
);

function Header() {
    return (
        <header>
            <Logo />
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/studio">Studio</Link></li>
                    <li><a href="#features">Features</a></li>
                    <li><a href="#pricing">Pricing</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
}

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
            <h1>Unleash Your Coding Potential</h1>
            <p>NabotStudio is a lightweight, online IDE that combines code and no-code approaches, all powered by AI.</p>

            <div className="action-buttons">
                <Link to="/studio">
                    <button className="primary">Explore NabotStudio</button>
                </Link>
                <button className="secondary">Sign Up</button>
                <button className="secondary">Log In</button>
            </div>

                <h2>Key Features</h2>
            <section id="features" className="features">
                <div className="feature-item">
                    <h3>AI-Powered Assistance</h3>
                    <p>Let AI guide you through the development process, offering smart suggestions and code completion.</p>
                </div>
                <div className="feature-item">
                    <h3>Code & No-Code Integration</h3>
                    <p>Seamlessly switch between code and visual building blocks to create complex applications with ease.</p>
                </div>
                <div className="feature-item">
                    <h3>Lightweight & Online</h3>
                    <p>Access your projects from anywhere, without the need for heavy installations or complex setups.</p>
                </div>
                <div className="feature-item">
                    <h3>Rapid Prototyping</h3>
                    <p>Quickly create and iterate on prototypes to bring your ideas to life in record time.</p>
                </div>
            </section>

            <section className="testimonials">
                <h2>What Our Users Say</h2>
                <div className="testimonial-container">
                    <div className="testimonial">
                        <p>"NabotStudio has revolutionized the way I build applications. The AI assistance is a game-changer!"</p>
                        <p className="author">- Jane Doe, Software Engineer</p>
                    </div>
                    <div className="testimonial">
                        <p>"I love the flexibility of switching between code and no-code. It's perfect for rapid prototyping and development."</p>
                        <p className="author">- John Smith, Startup Founder</p>
                    </div>
                </div>
            </section>

            <section id="pricing" className="pricing">
                <h2>Pricing Plans</h2>
                <div className="pricing-container">
                    <div className="pricing-plan">
                        <h3>Basic</h3>
                        <p className="price">Free</p>
                        <ul>
                            <li>Limited AI Assistance</li>
                            <li>Basic Code Editor</li>
                            <li>Community Support</li>
                        </ul>
                        <button>Get Started</button>
                    </div>
                    <div className="pricing-plan">
                        <h3>Pro</h3>
                        <p className="price">$19/month</p>
                        <ul>
                            <li>Full AI Assistance</li>
                            <li>Advanced Code Editor</li>
                            <li>Priority Support</li>
                        </ul>
                        <button>Start Pro Trial</button>
                    </div>
                    <div className="pricing-plan">
                        <h3>Enterprise</h3>
                        <p className="price">Contact Us</p>
                        <ul>
                            <li>Custom AI Solutions</li>
                            <li>Dedicated Support</li>
                            <li>Scalable Infrastructure</li>
                        </ul>
                        <button>Contact Us</button>
                    </div>
                </div>
            </section>

            <section className="faq">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-container">
                    <div className="faq-item">
                        <h3>What is NabotStudio?</h3>
                        <p>NabotStudio is an AI-powered online IDE that combines code and no-code approaches to help you build applications faster.</p>
                    </div>
                    <div className="faq-item">
                        <h3>How does the AI assistance work?</h3>
                        <p>Our AI provides smart suggestions, code completion, and error detection to streamline your development workflow.</p>
                    </div>
                </div>
            </section>

            <section id="contact" className="contact">
                <h2>Contact Us</h2>
                <p>Have questions? Reach out to our team for support and inquiries.</p>
                <a href="mailto:-@-.-">-@-.-</a>
            </section>

            <footer>
            </footer>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/studio" element={<IDE />} />
            </Routes>
        </Router>
    );
}

export default App;