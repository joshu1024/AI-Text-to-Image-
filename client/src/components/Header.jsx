import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { delay, motion } from "motion/react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();
  function onclickHandler() {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  }
  return (
    <motion.div
      className="flex flex-col justify-center items-center text-center my-5"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500"
        initial={{ opacity: 0.2, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <p>Best text to image generator</p>
        <img src={assets.star_icon} alt="" />
      </motion.div>
      <motion.h1
        className="mx-auto text-4xl sm:text-7xl max-w-[300px] sm:max-w-[590px] mt-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 2 }}
      >
        Text-to-{" "}
        <span
          className="text-purple-700"
          style={{ fontStyle: "italic", fontWeight: "bold" }}
        >
          image <br />
        </span>{" "}
        <span
          className="font-extralight"
          style={{
            textDecoration: "underline",
            textDecorationThickness: "1px",
            textUnderlineOffset: "2px",
          }}
        >
          in a flash!
        </span>
      </motion.h1>
      <motion.p
        className="mt-5 max-w-xl text-center mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        Harness the power of AI to bring your ideas to life. Create stunning
        visuals instantly — just type and let your imagination soar!
      </motion.p>
      <motion.button
        onClick={onclickHandler}
        className="sm:text-lg text-white bg-black m-2 px-12 py-2.5 rounded-full flex text-center w-auto gap-2 mt-8"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{
          default: { duration: 0.5 },
          opacity: { delay: 0.8 },
          duration: 1,
        }}
      >
        Generate images
        <img className="h-6" src={assets.star_group} alt="" />
      </motion.button>
      <motion.div
        className="flex mt-16 gap-3 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        {Array(6)
          .fill("")
          .map((item, index) => (
            <motion.img
              whileHover={{ scale: 1.05, duration: 0.1 }}
              className="hover:scale-105 transition-all duration-300 rounded max-sm:w-10"
              src={
                index % 2 === 0 ? assets.sample_img_2b : assets.sample_img_1b
              }
              alt=""
              key={index}
              width={70}
            />
          ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-2 text-neutral-600"
      >
        Generated images from AImaginify
      </motion.p>
    </motion.div>
  );
};

export default Header;
