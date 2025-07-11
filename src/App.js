/* */
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import IDE from "./pages/Studio";
import "./App.css";

// Mock Logo Component (replace with your actual logo)
const Logo = () => (
  <div className="logo">
    <img src="/logo512.png" alt="NabotStudio Logo" />
  </div>
);

function Header() {
  return (
    <header>
      <Logo />
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/studio">Studio</Link>
          </li>
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#pricing">Pricing</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
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
