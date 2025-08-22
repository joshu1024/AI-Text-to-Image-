import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";
import { AppContext } from "../context/AppContext";

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1b);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  const { generateImage } = useContext(AppContext);

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (input) {
      const image = await generateImage(input);
      console.log("Generated image from backend:", image);
      if (image) {
        setIsImageLoaded(true);
        setImage(image);
      } else {
        console.log("image could not be generated");
      }
    }
    setLoading(false);
  };
  return (
    <motion.form
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={onsubmitHandler}
      className="flex flex-col items-center justify-center min-h-[90vh]"
    >
      <div>
        <div className="relative">
          <img src={image} alt="" className="rounded max-w-sm" />
          <span
            className={`bg-blue-500 h-1 bottom-0 left-0 ${
              loading ? "w-full absolute transition-all duration-[10s]" : ""
            } `}
          />
        </div>
        <p className={!loading ? "hidden" : ""}>Loading...</p>
      </div>
      {!isImageLoaded && (
        <div className="flex w-full max-w-xl bg-neutral-500 text-white text-sm rounded-full p-0.5 mt-10">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Describe anything you want to create"
            className="flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color"
          />
          <button
            type="submit"
            className="bg-zinc-900 px-10 sm:px-16 py-3 rounded-full"
          >
            Generate
          </button>
        </div>
      )}
      {isImageLoaded && (
        <div className="flex mt-10 text-white p-0.5  justify-center text-sm rounded-full gap-2 flex-wrap ">
          <p
            onClick={() => setIsImageLoaded(false)}
            className="text-black  bg-transparent border border-zinc-900 px-8 py-3 rounded-full cursor-pointer"
          >
            Generate Another
          </p>
          <a
            download="generated.png"
            className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer"
            href={image}
          >
            Download
          </a>
        </div>
      )}
    </motion.form> //5:49:47
  );
};

export default Result;
