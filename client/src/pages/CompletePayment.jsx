import React from "react";
import { useNavigate } from "react-router-dom";

const CompletePayment = () => {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate("/result");
  }, 5000);
  return (
    <div className="flex justify-center items-center text-center  my-30 ">
      <h2 className="max-w-lg font-medium text-3xl mb-4 pl-20 ">
        Thank you!
        <br /> Your payment was successful. ✅
      </h2>
    </div>
  );
};

export default CompletePayment;
