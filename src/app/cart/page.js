"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from '@/lib/firebase';
export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  // const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleClick=()=>{
    router.push("/checkout")
  }

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/cart/cartItem`);
        const data = await res.json();
        setCartItems(data.data); // Fix here
        console.log("Fetched Cart Items:", data.data);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }finally{
        setLoading(cartItems);
      }
    };
  
    fetchCart();
  }, []);
  
  const auths= auth; 
  const user = auths.currentUser;
  const userId = user?.uid;
  const handleRemove = async (productId, userId) => {
    try {
      await fetch(`${API_BASE_URL}/api/cart/remove`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId }),
      });

      setCartItems((prev) => prev.filter((item) => item.productId !== productId));
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  if (!loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black border-opacity-50 mb-6 mx-auto"></div>
          <p className="text-gray-600 text-lg">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-8">
      {/* Progress Bar */}
      <div className="text-center font-semibold text-sm text-gray-600 tracking-wider mb-8">
        <span className="text-black">MY BAG</span> ——————— <span>ADDRESS</span> ——————— <span>PAYMENT</span>
      </div>

      <div className="max-w-6xl mx-auto bg-white p-8 rounded-3xl shadow-lg">
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <img
              src="/emptyCart.avif"
              alt="Empty Cart"
              className="mx-auto w-64 h-auto mb-8"
            />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Your shopping cart is empty!
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like you have not added anything yet.
            </p>

            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Popular Categories
            </h3>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                "Men’s T-shirts",
                "Women’s T-Shirts",
                "Joggers",
                "Shorts",
                "Tank Tops",
                "Full Sleeve T-Shirt",
                "Polos",
              ].map((cat) => (
                <span
                  key={cat}
                  className="bg-gray-200 px-4 py-2 rounded-full text-sm text-gray-700 hover:bg-gray-300 cursor-pointer transition"
                >
                  {cat}
                </span>
              ))}
            </div>

            <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition font-semibold">
              CONTINUE SHOPPING
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-gray-50 border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center space-x-5">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">{item.product.name}</h4>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-sm text-gray-700 font-medium">
                        ₹{item.product.price}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(item.productId, userId)}
                    className="text-red-600 hover:underline text-sm font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-white border rounded-2xl p-8 shadow-md h-fit sticky top-24">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h3>
              <div className="flex justify-between mb-4">
                <span className="text-gray-700">Subtotal</span>
                <span className="font-semibold text-gray-900">₹{total}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-700">Shipping</span>
                <span className="font-semibold text-gray-900">Free</span>
              </div>
              <hr className="my-6" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
              <button onClick={handleClick} className="w-full mt-8 bg-black text-white py-3 rounded-full hover:bg-gray-800 transition font-semibold text-lg">
                Proceed to Buy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
