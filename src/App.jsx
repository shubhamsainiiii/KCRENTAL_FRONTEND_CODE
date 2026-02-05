import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import ScrollToTop from "./components/ScrollToTop";
import Jewelry from "./pages/Jewelry";
import JewelryDetails from "./pages/JewelryDetails";
import Login from "./Admin/Login";
import AdminRoute from "./Admin/AdminRoute";
import Dashboard from "./Admin/Dashboard";
import OurServices from "./pages/OurServices";

const App = () => {
  return (
    <>
      <div className="font-primary">
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/jewelry" element={<Jewelry />} />
          <Route path="/jewelry/:id" element={<JewelryDetails />} />
          <Route path="/services" element={<OurServices />} />

          <Route path="/admin/login" element={<Login />} />
          {/* Admin private route – user ko sidha home */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
