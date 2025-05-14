'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { auth } from '@/lib/firebase.js';  // Import Firebase auth
import Image from 'next/image';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL; // Use the environment variable

    fetch(`${apiUrl}/api/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch product details');
        }
        return res.json();
      })
      .then((data) => {
        console.log('Fetched product data:', data);
        setProduct(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load product details. Please try again later.');
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const user = auth.currentUser;  // Get the logged-in user
  
      if (!user) {
        alert("You need to be logged in to add to the cart.");
        return;
      }
  
      const userId = user.uid;  // Use the Firebase UID as userId for cart
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,  // Directly use the Firebase UID as userId
          productId: product.id,
          quantity: quantity,
        }),
      });
  
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.devError || 'Failed to add to cart');
      }
  
      alert('Added to cart successfully!');
    } catch (error) {
      console.error('Add to cart error:', error);
      alert(error.message);
    }
  };
    

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-black">
        <div className="loader"></div>
        Loading product details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-black">
        <div className="text-black">{error}</div>
      </div>
    );
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row w-full max-w-6xl">
        {/* Left: Image */}
        <div className="flex gap-4">
          {product.productImages?.map((image) => (
            <img
              key={image.id}
              src={image.imageUrl}
              alt={product.name || "Product Image"}
              className="w-full h-[300px] object-cover rounded-md mb-3 transition-all duration-300 transform hover:scale-105"
            />
          ))}
        </div>

        {/* Right: Details */}
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-4 text-black">{product.name}</h1>
          <div className="text-2xl text-black font-bold mb-4">
            ₹{product.price}
          </div>
          <p className="text-black text-sm mb-6">{product.description}</p>

          <div className="mb-6">
            <h3 className="text-md font-semibold mb-2 text-black">Select Size:</h3>
            <div className="flex flex-wrap gap-3">
              {['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  aria-selected={selectedSize === size}
                  className={`px-4 py-2 border rounded-md ${selectedSize === size ? 'bg-black text-white' : 'text-black'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-md font-semibold text-black">Quantity:</h3>
            <div className="flex items-center border rounded-md overflow-hidden">
              <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} className="px-3 py-1 bg-gray-200">-</button>
              <div className="px-4">{String(quantity).padStart(2, '0')}</div>
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1 bg-gray-200">+</button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-4 rounded-md text-lg font-semibold hover:bg-gray-900 transition mb-6"
          >
            ADD TO CART
          </button>

          <p className="text-black text-xs">
            Free Delivery on Orders Above ₹999 | 30-Day Easy Return Policy
          </p>
        </div>
      </div>
    </div>
  );
}
