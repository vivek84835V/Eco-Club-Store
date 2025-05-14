"use client";
import { useState } from "react";

const Carousel = () => {
    const slides = [
        {
            id: 1,
            title: "Banner 1",
            image:
                "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/home_page_dFImlis.jpg?format=webp&w=1500&dpr=1.3",
        },
        {
            id: 2,
            title: "Banner 2",
            image:
                "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/homepage_Frfx00U.jpg?format=webp&w=1500&dpr=1.3",
        },
        {
            id: 3,
            title: "Banner 3",
            image:
                "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/pathfinder__homepage_NOW_LIVE.jpg?format=webp&w=1500&dpr=1.3",
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="relative w-full overflow-hidden shadow-lg">
            {/* Slides */}
            <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                    width: `${slides.length * 35}%`,
                }}
            >
                {slides.map((slide) => (
                    <div
                        key={slide.id}
                        className="w-full flex-shrink-0"
                        style={{ height: "550px",borderTopColor:'black',borderTopWidth:3 }}
                    >
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* Controls */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-black shadow-lg transition-all duration-300 ease-in-out focus:outline-none"
                aria-label="Previous Slide"
            >
                <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-black shadow-lg transition-all duration-200 ease-in-out focus:outline-none"
                aria-label="Next Slide"
            >
                <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-1 h-1 transition-all duration-200 ease-in-out ${
                            currentIndex === index ? "bg-black" : "bg-gray-400"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
