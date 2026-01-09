/* eslint-disable no-unused-vars */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const ImageSlider = ({ slides = [] }) => {
    return (
        <section className="relative w-full mt-6 h-svh md:h-screen overflow-hidden">
            <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                slidesPerView={1}
                loop
                effect="fade"
                speed={1200}
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                className="w-full h-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-full">

                            {/* Desktop Image */}
                            <motion.img
                                src={slide.desktop}
                                alt={`desktop-slide-${index}`}
                                className="hidden md:block w-full h-full object-cover"
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 2.5, ease: "easeOut" }}
                            />

                            {/* Mobile Image */}
                            <motion.img
                                src={slide.mobile}
                                alt={`mobile-slide-${index}`}
                                className="block md:hidden w-full h-full object-cover"
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 2.5, ease: "easeOut" }}
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/10" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default ImageSlider;
