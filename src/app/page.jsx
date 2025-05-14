'use client';

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Carousel from "@/components/Caraousel";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/products`);
        if (!res.ok) throw new Error("Network response was not ok");
        const result = await res.json();
        setProducts(result.data);
      } catch (err) {
        console.error("Fetch failed", err);
        setError("⚠️ Failed to load products. Please try again later.");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-[#fdfdfd] min-h-screen font-sans text-gray-800">
      {/* Hero Carousel */}
      <Carousel />

      {/* New Arrivals */}
      <section className="px-4 sm:px-8 py-14 max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 tracking-tight text-gray-900">
          New Arrivals
        </h2>

        {error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500 animate-pulse">Loading products...</p>
        ) : (
          <div className="relative">
            <div className="flex gap-16 overflow-x-scroll no-scrollbar pb-2 px-1 snap-x snap-mandatory">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="min-w-[180px] max-w-[250px] snap-start flex-shrink-0"
                >
                  <Link
                    href={`/product/${product.id}`}
                    className="block hover:scale-[1.03] transition-transform duration-300 ease-in-out"
                  >
                    <ProductCard product={product} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>


      <section className="bg-gray-200 px-4 sm:px-8 py-14 mx-w-full mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-start mb-8 tracking-tight text-white">
          Trending All
        </h2>

        {error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500 animate-pulse">Loading products...</p>
        ) : (
          <div className="relative">
            <div className="flex gap-16 overflow-x-scroll no-scrollbar pb-2 px-1 snap-x snap-mandatory">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="min-w-[180px] max-w-[250px] snap-start flex-shrink-0"
                >
                  <Link
                    href={`/product/${product.id}`}
                    className="block hover:scale-[1.03] transition-transform duration-300 ease-in-out"
                  >
                    <ProductCard product={product} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
