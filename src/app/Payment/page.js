"use client";

import { useEffect, useState } from "react";
import { loadRazorpayScript } from "../../utils/loadRazorpay.js";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const PaymentPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState(null);
  const [amount, setAmount] = useState();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const token = await user.getIdToken();
      const uid = user.uid;

      try {
        // Fetch cart
        const cartRes = await fetch(`${API_BASE_URL}/api/cart/cartItem`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const cartData = await cartRes.json();
        const items = cartData.data || [];
        setCartItems(items);

        // Calculate total
        const totalAmount = items.reduce(
          (acc, item) => acc + item.product.price * item.quantity,
          0
        );
        setAmount(totalAmount * 100); // Razorpay needs paise

        // Fetch address
        const addressRes = await fetch(`${API_BASE_URL}/api/address/${uid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const addressData = await addressRes.json();
        if (Array.isArray(addressData.data) && addressData.data.length > 0) {
          setAddress(addressData.data[0]);
        }

      } catch (error) {
        console.error("Error fetching cart or address:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePayment = async () => {
    if (!amount || amount <= 0) return alert("Invalid amount!");

    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    const response = await fetch(`${API_BASE_URL}/api/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    const orderData = await response.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Labmentix",
      description: "Order Payment",
      image: "/logo.png",
      order_id: orderData.id,
      handler: (response) => {
        alert("✅ Payment successful!");
        console.log("Payment Response:", response);
        router.push("/");
      },
      prefill: {
        name: address?.name || "User",
        email: "user@example.com",
        contact: address?.phone || "9999999999",
      },
      theme: {
        color: "#0F172A",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Loading payment details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Confirm & Pay</h1>

      {address && (
        <div className="bg-gray-100 p-4 rounded mb-4">
          <h2 className="font-semibold mb-2">Shipping Address</h2>
          <p>{address.name} ({address.phone})</p>
          <p>{address.street}, {address.city}, {address.state} - {address.zipCode}, {address.country}</p>
        </div>
      )}

      <div className="bg-gray-50 p-4 rounded mb-4">
        <h2 className="font-semibold mb-2">Cart Summary</h2>
        {cartItems.length > 0 ? (
          <ul className="space-y-2">
            {cartItems.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span>{item.product.name} × {item.quantity}</span>
                <span>₹{item.product.price * item.quantity}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No items in cart.</p>
        )}
        <p className="mt-4 font-bold text-lg">Total: ₹{amount / 100}</p>
      </div>

      <button
        onClick={handlePayment}
        disabled={cartItems.length === 0}
        className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-semibold"
      >
        Pay ₹{amount / 100}
      </button>
    </div>
  );
};

export default PaymentPage;
