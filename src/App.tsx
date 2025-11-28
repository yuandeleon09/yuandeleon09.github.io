import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Blog from "./pages/Blog";
import Portfolio from "./pages/Portfolio";

function App() {
  return (
    <Router>
      <nav style={{ display: "flex", gap: "15px", padding: "10px" }}>
        <Link to="/">Blog</Link>
        <Link to="/portfolio">Portfolio</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </Router>
  );
}

export default App;
