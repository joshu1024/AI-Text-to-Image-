import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Result from "./pages/Result";
import Home from "./pages/Home";
import BuyCredit from "./pages/BuyCredit";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { AppContext } from "./context/AppContext";
import CancelPayment from "./pages/CancelPayment";
import CompletePayment from "./pages/CompletePayment";

const App = () => {
  const { showLogin } = useContext(AppContext);
  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-orange-50 to-teal-50">
      <ToastContainer position="bottom-right" />
      <NavBar />
      {showLogin && <Login />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/buy" element={<BuyCredit />} />
        <Route path="/complete-payment" element={<CompletePayment />} />
        <Route path="/cancel-payment" element={<CancelPayment />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
