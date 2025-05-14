"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token"); // optional if you’re storing tokens
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Checking authentication...</div>;
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-white via-gray-50 to-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-xl border-r">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 bg-gray-50">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Welcome, Admin 👋
          </h1>
          <button
            onClick={handleLogout}
            className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Logout
          </button>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Products Card */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Products</h2>
            <p className="text-gray-600 text-sm">
              View and manage your product listings
            </p>
          </div>

          {/* Orders Card */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Orders</h2>
            <p className="text-gray-600 text-sm">
              Track and fulfill customer orders
            </p>
          </div>

          {/* Analytics Card */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Analytics</h2>
            <p className="text-gray-600 text-sm">
              Sales and performance insights
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}