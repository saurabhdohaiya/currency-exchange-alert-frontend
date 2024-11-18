import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
// import Dashboard from "./pages/Dashboard";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
