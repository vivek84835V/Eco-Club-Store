"use client";

export default function ProductCard({ product }) {
  return (
    <div className="group cursor-pointer bg-white rounded-xl shadow-md p-3 w-full md:w-[250px] hover:shadow-xl transition-all duration-300">
      <div className="relative overflow-hidden rounded-lg mb-3">
        {/* Product Image */}
        <img
          src={product.productImages?.[0]?.imageUrl || "https://via.placeholder.com/300x300?text=No+Image"}
          alt={product.name || "Product Image"}
          className="w-full h-[300px] object-cover transform transition-transform duration-300 group-hover:scale-105"
        />

        {/* Discount Badge (if applicable) */}
        {product.discount && (
          <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full shadow-md">
            {product.discount}% OFF
          </span>
        )}
      </div>

      {/* Product Title */}
      <h4 className="font-semibold text-sm mb-1 truncate">{product.name}</h4>

      {/* Product Price */}
      <p className="text-sm font-bold text-gray-800">₹{product.price}</p>

      <button className="px-6 py-3 bg-gradient-to-r from-black via-gray-900 to-black text-white font-semibold tracking-wide shadow-lg hover:shadow-xl hover:from-gray-800 hover:to-black transition-all duration-300">
  Add To Cart
</button>

    </div>
  );
}
