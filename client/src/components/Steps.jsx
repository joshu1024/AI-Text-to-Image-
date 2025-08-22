import React from "react";
import { assets, stepsData } from "../assets/assets";
import { motion } from "motion/react";

const Steps = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-32"
    >
      <h1 className="mb-2 text-3xl sm:text-4xl font-semibold">How it works</h1>
      <p className="mb-8 text-lg text-gray-600">
        Turn your imagination into breathtaking images
      </p>
      <div className="space-y-4 w-full max-w-3xl text-sm">
        {stepsData.map((item, index) => (
          <div
            key={index}
            className="rounded-lg flex items-center gap-4 p-5 px-8 bg-white/20 shadow-2xl border-0 cursor-pointer hover:scale-[1.02] transition-all duration-300"
          >
            <img width={40} src={item.icon} alt="" />
            <h1 className="text-xl font-medium">{item.title}</h1>
            <p className="text-gray-500">{item.description}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Steps;
