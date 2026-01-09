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

import slider1 from "../assets/images/slider1.jpg";
import slider2 from "../assets/images/slider2.jpg";
import slider3 from "../assets/images/slider4.png";

import slidermobile1 from "../assets/images/slidermobile1.jpg";
import slidermobile2 from "../assets/images/slidermobile2.jpg";
import slidermobile3 from "../assets/images/slidermobile4.jpg";

const sliderData = [
  { desktop: slider1, mobile: slidermobile1 },
  { desktop: slider2, mobile: slidermobile2 },
  { desktop: slider3, mobile: slidermobile3 },
];

/* ================= ANIMATIONS ================= */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const Home = () => {
  const navigate = useNavigate();
  const [garments, setGarments] = useState([]);
  const [jewelry, setJewelry] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const garmentsRes = await API.get("/garment/all");
        const jewelryRes = await API.get("/jewelry/all");

        setGarments(garmentsRes.data.slice(0, 4));
        setJewelry(jewelryRes.data.slice(0, 4));
      } catch (err) {
        console.error("Home API Error:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="bg-linear-to-br from-[#3A153F] via-[#8234a1] to-[#3A153F] text-gray-900"
    >
      {/* ================= HERO ================= */}
      <motion.section variants={fadeUp} className="mb-28">
        <ImageSlider slides={sliderData} />
      </motion.section>

      {/* ================= RENT / BUY ================= */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-28">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { title: "RENT", text: "Rent Designer Wear", img: rent, path: "/garments" },
            { title: "BUY", text: "Pre-loved Luxury Styles", img: buy, path: "/garments" },
            { title: "SERVICES", text: "Styling & Jewelry Rental", img: rent, path: "/services" },
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

      {/* ================= GARMENTS ================= */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="text-center mb-14">
          <h2 className="text-4xl text-[#e2b82e] font-bold">Garments</h2>
          <p className="text-yellow-300 mt-2">Curated designer wear for every occasion</p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
        >
          {garments.map((item) => (
            <motion.div
              key={item._id}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              onClick={() => navigate(`/garments/${item._id}`)}
              className="bg-[#340B53] rounded-2xl overflow-hidden shadow-md cursor-pointer"
            >
              {/* IMAGE – FULL WIDTH, NO GAP */}
              <div className="h-72 w-full overflow-hidden">
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.12 }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full"
                >
                  <LazyLoadImage
                    effect="blur"
                    src={getImageUrl(item.images?.[0]?.url)}
                    alt={item.name}
                    wrapperClassName="block w-full h-full"
                    className="w-full h-full object-cover block"
                  />
                </motion.div>
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <h3 className="font-semibold text-lg truncate text-[#D4AF37]">
                  {item.name}
                </h3>

                <p className="text-sm text-[#F3D578] uppercase">
                  {item.category}
                </p>
                <p className="mt-2 font-bold text-[#D4AF37]">
                  Buy ₹{item.price?.buy}
                </p>
                <p className="mt-2 font-bold text-[#D4AF37]">
                  Rent ₹{item.price?.rentPerDay}/day
                </p>
              </div>
            </motion.div>

          ))}
        </motion.div>

        <div className="text-center mt-14">
          <button
            onClick={() => navigate("/garments")}
            className="inline-flex font-semibold text-[#e2b82e] hover:text-black items-center gap-3 px-10 py-3 rounded-full border border-yellow-400 hover:bg-yellow-500/90 transition-all duration-500 cursor-pointer"
          >
            Explore All Garments <FaArrowRight />
          </button>
        </div>
      </section>

      {/* ================= JEWELRY ================= */}
      <section className="pb-10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="text-center mb-14">
            <h2 className="text-4xl text-[#e2b82e] font-bold">Exquisite Jewelry</h2>
            <p className="text-yellow-300 mt-2">Timeless elegance, handcrafted designs</p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
          >
            {jewelry.map((item) => (
              <motion.div
                key={item._id}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                onClick={() => navigate(`/jewelry/${item._id}`)}
                className="bg-[#340B53] rounded-2xl overflow-hidden shadow-md cursor-pointer"
              >
                {/* IMAGE – FULL WIDTH */}
                <div className="h-72 w-full overflow-hidden">
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.12 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full"
                  >
                    <LazyLoadImage
                      effect="blur"
                      src={getImageUrl(item.images?.[0]?.url)}
                      alt={item.name}
                      wrapperClassName="block w-full h-full"
                      className="w-full h-full object-cover block"
                    />
                  </motion.div>
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  <h3 className="font-semibold text-lg truncate text-[#D4AF37]">
                    {item.name}
                  </h3>

                  <p className="text-sm text-[#F3D578] uppercase">
                    {item.category}
                  </p>

                  <p className="mt-2 font-bold text-[#D4AF37]">
                    Buy ₹{item.price?.buy}
                  </p>
                  <p className="mt-2 font-bold text-[#D4AF37]">
                    Rent ₹{item.price?.rentPerDay}/day
                  </p>
                </div>
              </motion.div>

            ))}
          </motion.div>

          <div className="text-center mt-14">
            <button
              onClick={() => navigate("/jewelry")}
              className="inline-flex font-semibold text-[#e2b82e] hover:text-black items-center gap-3 px-10 py-3 rounded-full border border-yellow-400 hover:bg-yellow-500/90 transition-all duration-500 cursor-pointer hover:border-gray-700"
            >
              Explore Jewelry <FaArrowRight />
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
