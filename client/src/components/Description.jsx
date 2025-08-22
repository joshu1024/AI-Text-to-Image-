import React from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";

const Description = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col justify-center items-center my-24 p-6 md:px-28"
    >
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        Create AI images
      </h1>
      <p className="text-gray-500 mb-8">Turn your imagination into visuals</p>
      <div className="flex flex-col gap-5 md:gap-14 md:flex-row items-center">
        <img
          src={assets.sample_img_1}
          alt=""
          className="w-80 xl:w-96 rounded-lg"
        />
        <div>
          <h2 className="max-w-lg font-medium text-3xl mb-4">
            Introducing the AI powered Text to image Generator
          </h2>
          <p className="text-gray-600 mb-4">
            Turn your imagination into visuals with our free AI image generator.
            From breathtaking artwork to one-of-a-kind designs, just type your
            idea and let our tool create stunning images in seconds. Describe
            it, click, and see your vision come to life—effortlessly.{" "}
          </p>
          <p className="text-gray-600">
            Enter a prompt, and let our advanced AI turn your words into
            high-quality images—instantly. Whether you're crafting product
            visuals, character designs, portraits, or imagining concepts that
            don’t yet exist, our powerful tool brings ideas to life with ease.
            With cutting-edge technology behind it, your creative possibilities
            are endless.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Description;
