'use client';

import { useEffect, useState } from 'react';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    categoryId: '',
    images: [''],
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : '';
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const isValidForm = () => {
    return (
      newProduct.name.trim() &&
      newProduct.price.trim() &&
      newProduct.stock.trim() &&
      newProduct.categoryId.trim()
    );
  };

  const fetchAdminProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/admin/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setProducts(data.data);
    } catch (err) {
      console.error('Failed to fetch products', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCategories(data.data || []);
    } catch (err) {
      console.error('Failed to fetch categories', err);
    }
  };

  useEffect(() => {
    fetchAdminProducts();
    fetchCategories();
  }, []);

  const handleAddProduct = async () => {
    if (!isValidForm()) {
      alert('Please fill all required fields');
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newProduct,
          price: parseFloat(newProduct.price),
          stock: parseInt(newProduct.stock),
          discountPrice: newProduct.discountPrice
            ? parseFloat(newProduct.discountPrice)
            : null,
          images: newProduct.images.filter((url) => url.trim() !== ''),
        }),
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.message || 'Add product failed');
      alert('✅ Product added!');
      setShowAddForm(false);
      setNewProduct({
        name: '',
        description: '',
        price: '',
        stock: '',
        discountPrice: '',
        categoryId: '',
        images: [''],
      });
      fetchAdminProducts();
    } catch (err) {
      alert(`❌ ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure to delete this product?')) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Delete Product Failed');
      alert('🗑️ Product deleted');
      fetchAdminProducts();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete product.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">📦 Manage Products</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          + Add Product
        </button>
      </div>

      {/* Add Product Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-lg">
            <h3 className="text-2xl font-semibold mb-4">Add New Product</h3>
            <input
              type="text"
              placeholder="Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="w-full mb-3 p-3 border rounded"
            />
            <textarea
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              className="w-full mb-3 p-3 border rounded"
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="w-full mb-3 p-3 border rounded"
            />
            <input
              type="number"
              placeholder="Stock"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
              className="w-full mb-3 p-3 border rounded"
            />
            <select
              value={newProduct.categoryId}
              onChange={(e) =>
                setNewProduct({ ...newProduct, categoryId: e.target.value })
              }
              className="w-full mb-3 p-3 border rounded"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {newProduct.images.map((url, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Image URL ${index + 1}`}
                value={url}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    images: newProduct.images.map((img, i) =>
                      i === index ? e.target.value : img
                    ),
                  })
                }
                className="w-full mb-2 p-3 border rounded"
              />
            ))}
            <button
              onClick={() => setNewProduct({ ...newProduct, images: [...newProduct.images, ''] })}
              className="text-blue-600 mb-4"
            >
              + Add another image
            </button>

            <div className="flex gap-4">
              <button
                onClick={handleAddProduct}
                disabled={!isValidForm()}
                className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-400 text-white w-full py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product List */}
      {loading ? (
        <p className="text-center mt-10">Loading products...</p>
      ) : (
        <div className="flex overflow-x-auto gap-6 scrollbar-thin pb-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[200px] max-w-[200px] bg-white rounded-xl shadow p-4 flex-shrink-0"
            >
              <img
                src={product.productImages?.[0]?.imageUrl}
                alt={product.name}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
              <h4 className="text-sm font-semibold text-gray-800">{product.name}</h4>
              <p className="text-xs text-gray-500 mb-2 line-clamp-2">{product.description}</p>
              <div className="text-sm font-medium text-blue-600">₹{product.price}</div>
              <div className="text-xs text-gray-400 mb-2">{product.category?.name}</div>
              <button
                onClick={() => handleDelete(product.id)}
                className="w-full bg-red-500 text-white py-1 mt-2 text-xs rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
