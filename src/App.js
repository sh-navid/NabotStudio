import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import IDE from "./pages/Studio";
import "./App.css";

const Logo = () => (
  <div className="logo">
    <img src="/logo512.png" alt="NabotStudio Logo" />
  </div>
);

function Header() {
  return (
    <header>
      <Logo />
    </header>
  );
}

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<IDE />} />
        <Route path="/studio" element={<IDE />} />
      </Routes>
    </Router>
  );
}

export default App;
