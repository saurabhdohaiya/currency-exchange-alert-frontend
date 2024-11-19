import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./components/Layout";

import ProtectedRoute from "./components/ProtectedRoute";

import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import SignInPage from "./pages/SignInPage";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          style={{
            backgroundColor: "#333333", // Default background for all toasts
            borderRadius: "8px", // Default border radius for all toasts
          }}
        />
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
};

export default App;
