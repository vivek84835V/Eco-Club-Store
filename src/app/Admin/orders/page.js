"use client";

import { useEffect, useState } from "react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/admin/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrders();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-opacity-50 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <h2 className="text-4xl font-bold mb-10 text-gray-800">📦 All Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center mt-20">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">No orders found</h3>
          <p className="text-gray-500">It looks like there are no orders yet.</p>
        </div>
      ) : (
        <div className="grid gap-8">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-3xl shadow-md hover:shadow-lg p-8 transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xl font-bold text-gray-800">Order #{order.id}</h4>
                <span className="text-blue-600 font-semibold">₹{order.totalAmount}</span>
              </div>

              <p className="text-gray-600 mb-2">
                <span className="font-medium">User:</span> {order.user?.email || "N/A"}
              </p>

              <div className="mt-4">
                <h5 className="font-semibold text-gray-700 mb-2">🛒 Items:</h5>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {(order.orderItems || []).map((item) => (
                    <li key={item.id}>
                      {item.product?.name || "Unknown Product"} × {item.quantity}{" "}
                      <span className="text-gray-400">(₹{item.priceAtPurchase})</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
