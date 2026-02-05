/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import API from "../Admin/AdminApi";
import { getImageUrl } from "../utils/helper";
import ImageSlider from "../Home/ImageSlider";

// Images
import rent from "../assets/images/rent.jpg";
import buy from "../assets/images/buy.jpg";
import sell from "../assets/images/sell.jpg";

import slider1 from "../assets/images/slider1.jpg";
import slider2 from "../assets/images/slider2.jpg";
import slider3 from "../assets/images/slider4.png";

import slidermobile1 from "../assets/images/slidermobile1.jpg";
import slidermobile2 from "../assets/images/slidermobile2.jpg";
import slidermobile3 from "../assets/images/slidermobile3.jpg";

const sliderData = [
  { desktop: slider1, mobile: slidermobile1 },
  { desktop: slider2, mobile: slidermobile2 },
  { desktop: slider3, mobile: slidermobile3 },
];

/* ================= ANIMATIONS ================= */
const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const Home = () => {
  const navigate = useNavigate();
  const [jewelry, setJewelry] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jRes = await API.get("/jewelry/all");

        setJewelry(jRes.data.slice(0, 4));
      } catch (err) {
        console.error("Home API Error:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="bg-linear-to-br from-[#3A153F] via-[#8234a1] to-[#3A153F] text-gray-800">

      {/* ================= HERO ================= */}
      <motion.section variants={fadeUp} initial="hidden" animate="visible">
        <ImageSlider slides={sliderData} />
      </motion.section>

      {/* ================= RENT / BUY ================= */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-28">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { title: "SHOP", text: "Explore Exquisite Jewelry", img: rent, path: "/jewelry" },
            { title: "BUY", text: "Premium Jewelry Collection", img: buy, path: "/jewelry" },
            { title: "SERVICES", text: "Styling & Jewelry", img: sell, path: "/services" },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -10 }}
              onClick={() => navigate(item.path)}
              className="relative cursor-pointer rounded-2xl overflow-hidden shadow-sm hover:shadow-md shadow-[#D4AF37] group h-120"
            >
              {/* IMAGE */}
              <LazyLoadImage
                effect="blur"
                wrapperProps={{ style: { transitionDelay: "1s" } }}
                src={item.img}
                alt={item.title}
                wrapperClassName="block w-full h-full"
                className="w-full h-full object-cover"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center text-center px-6">
                <h2 className="text-5xl font-extrabold text-white">
                  {item.title}
                </h2>
                <p className="text-white/90 mt-4">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ================= JEWELRY ================= */}
      <section className="max-w-7xl mx-auto px-6 mt-20 pb-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-[#e2b82e]">Exquisite Jewelry</h2>
          <p className="text-yellow-300 mt-2">
            Timeless elegance, handcrafted designs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {jewelry.map((item) => (
            <motion.div
              key={item._id}
              onClick={() => navigate(`/jewelry/${item._id}`)}
              className="bg-[#340B53] rounded-3xl shadow-xl p-4 cursor-pointer hover:scale-[1.02] transition-all"
            >
              <div className="rounded-2xl bg-[#340B53] p-3">
                <div className="aspect-3/4 rounded-xl overflow-hidden">
                  <LazyLoadImage
                    src={getImageUrl(item.images?.[0]?.url)}
                    alt={item.name}
                    effect="blur"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="pt-4 px-2">
                <h3 className="text-[#e2b82e] font-semibold text-lg leading-snug">
                  {item.name}
                </h3>

                <p className="uppercase text-sm text-[#e2b82e]/80 mt-1">
                  {item.category}
                </p>

                <p className="font-semibold text-[#e2b82e]">
                  Buy ₹{item.price?.buy}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-14">
          <button
            onClick={() => navigate("/jewelry")}
            className="inline-flex font-semibold text-[#e2b82e] hover:text-black items-center gap-3 px-10 py-3 rounded-full border border-yellow-400 hover:bg-yellow-500/90 transition-all duration-500 cursor-pointer"
          >
            Explore All Jewelry <FaArrowRight />
          </button>
        </div>
      </section>
    </section>
  );
};

export default Home;
