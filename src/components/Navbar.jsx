"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogin = () => {
    router.push('/login');
  };

  const handleCart = () => {
    router.push('/cart');
  };

  // const handleSearch = () => {
  //   if (searchTerm.trim()) {
  //     router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
  //   }
  // };

  return (
    <header className="bg-white shadow-sm">
      <div className="bg-black text-white text-center py-1 text-xs">
        FREE SHIPPING ON ORDERS ABOVE ₹699 | SHOP NOW
      </div>
      
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="font-bold text-xl">
          <Link href="/">THE SOULED STORE</Link>
        </div>
        
        <nav className="md:flex space-x-6">
          <Link href="/men" className="text-gray-700 hover:text-black font-medium">MEN</Link>
          <Link href="/women" className="text-gray-700 hover:text-black font-medium">WOMEN</Link>
          <Link href="/kids" className="text-gray-700 hover:text-black font-medium">KIDS</Link>
          <Link href="/collectibles" className="text-gray-700 hover:text-black font-medium">COLLECTIBLES</Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
              <input
                type="text"
                placeholder="Search products"
                autoComplete="off"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              />
            </form>
          </div>
          <div className="flex space-x-3">
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button onClick={handleLogin} className="text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            <button onClick={handleCart} className="text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}