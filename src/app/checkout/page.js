"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function MyAddressesPage() {
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    isDefault: false,
  });
  const [editingId, setEditingId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchAddresses(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchAddresses = async (uid) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/address/${uid}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    console.log("Fetched addresses:", data); // 👈 Log response here
    setAddresses(data.data || []);
  } catch (err) {
    console.error("Fetch error:", err);
  }
};

  const handlePayment =()=>{
   router.push("/Payment");
  };
  const handleSubmit = async () => {
  if (!form.name || !form.phone || !form.street || !form.city || !form.state || !form.zipCode || !form.country) {
    return setError("All fields are required.");
  }
  if (!userId) return setError("User ID is missing.");

  setLoading(true);
  setError("");

  const body = { ...form, userId };
  const endpoint = editingId
    ? `${API_BASE_URL}/api/address/update/${editingId}`
    : `${API_BASE_URL}/api/address/add`;

  const method = editingId ? "PUT" : "POST";

  try {
    const res = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error("Failed to save address");

    const savedAddress = await res.json();
    
    // Save data to sessionStorage for the payment page
    sessionStorage.setItem("savedAddress", JSON.stringify(savedAddress.data));
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]"); // Assuming you're storing cart in localStorage
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Redirect to payment
    router.push("/Payment");
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


  const handleEdit = (address) => {
    setForm({
      name: address.name,
      phone: address.phone,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      isDefault: address.isDefault,
    });
    setEditingId(address.id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this address?")) return;
    try {
      await fetch(`${API_BASE_URL}/api/address/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAddresses(userId);
    } catch (err) {
      alert("Failed to delete address",err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6">My Addresses</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 mb-6">
        {["name", "phone", "street", "city", "state", "zipCode", "country"].map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field[0].toUpperCase() + field.slice(1)}
            className="p-3 border rounded-md"
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          />
        ))}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.isDefault}
            onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
          />
          Set as default
        </label>
      </div>

      <button
        onClick={handleSubmit}
        className={`w-full py-3 rounded-lg text-white font-semibold ${
          loading ? "bg-gray-400" : "bg-black hover:bg-gray-800"
        }`}
        disabled={loading}
      >
        {editingId ? "Update Address" : "Save Address"}
      </button>

      <div className="mt-8 space-y-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="border p-4 rounded-md shadow-sm flex justify-between items-start"
          >
            <div>
              <p className="font-semibold">{address.name} ({address.phone})</p>
              <p>{address.street}, {address.city}, {address.state}, {address.zipCode}, {address.country}</p>
              {address.isDefault && (
                <span className="text-green-600 font-medium text-sm">Default Address</span>
              )}
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(address)} className="text-blue-500 hover:underline">Edit</button>
              <button onClick={() => handleDelete(address.id)} className="text-red-500 hover:underline">Delete</button>
              <button onClick={handlePayment} className="text-red-500 hover:underline">Buy</button>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
