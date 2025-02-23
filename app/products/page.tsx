"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: "Men" | "Women" | "Accessories";
};

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Classic Blazer",
    price: 129.99,
    image: "/clothes1.jpg",
    category: "Men",
  },
  {
    id: 2,
    name: "Elegant Dress",
    price: 159.99,
    image: "/clothes2.jpg",
    category: "Women",
  },
  {
    id: 3,
    name: "Modern Trousers",
    price: 89.99,
    image: "/clothes3.jpg",
    category: "Men",
  },
  {
    id: 4,
    name: "Stylish Jacket",
    price: 199.99,
    image: "/clothes4.jpg",
    category: "Men",
  },
  {
    id: 5,
    name: "Trendy Shirt",
    price: 69.99,
    image: "/clothes5.jpg",
    category: "Women",
  },
  {
    id: 6,
    name: "Chic Top",
    price: 49.99,
    image: "/clothes6.jpg",
    category: "Women",
  },
  {
    id: 7,
    name: "Designer Jeans",
    price: 109.99,
    image: "/clothes7.jpg",
    category: "Men",
  },
  {
    id: 8,
    name: "Casual Hoodie",
    price: 79.99,
    image: "/clothes8.jpg",
    category: "Accessories",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function ProductsPage() {
  const [filter, setFilter] = useState<"All" | "Men" | "Women" | "Accessories">("All");
  const [sort, setSort] = useState("featured");

  const filteredProducts = useMemo(() => {
    let result = initialProducts;

    if (filter !== "All") {
      result = result.filter((p) => p.category === filter);
    }

    if (sort === "newest") {
      result = [...result].sort((a, b) => b.id - a.id);
    } else if (sort === "priceLowHigh") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sort === "priceHighLow") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else {
      result = [...result].sort((a, b) => a.id - b.id);
    }

    return result;
  }, [filter, sort]);

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Banner */}
      <motion.section 
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/store-banner.jpg"
          alt="Store Banner"
          width={1920}
          height={384}
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.h1 
            className="text-4xl md:text-6xl font-extrabold text-white"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Discover Exclusive Styles
          </motion.h1>
          <motion.p 
            className="mt-4 text-lg md:text-2xl text-gray-200"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Elevate your wardrobe with premium collections.
          </motion.p>
        </div>
      </motion.section>

      {/* Filters & Sorting */}
      <motion.section 
        className="bg-white py-4 shadow"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          {/* Filters */}
          <div className="flex space-x-4 mb-4 md:mb-0">
            {(["All", "Men", "Women", "Accessories"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 border rounded-md text-gray-800 transition ${
                  filter === cat 
                    ? "bg-teal-500 text-white" 
                    : "bg-white hover:bg-teal-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          {/* Sorting */}
          <div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:border-teal-500"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="priceLowHigh">Price: Low to High</option>
              <option value="priceHighLow">Price: High to Low</option>
            </select>
          </div>
        </div>
      </motion.section>

      {/* Products Grid */}
      <motion.section 
        className="max-w-7xl mx-auto px-4 py-10"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-600">No products found.</p>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                className="bg-white rounded-lg shadow hover:shadow-2xl transition transform hover:-translate-y-1"
                variants={itemVariants}
              >
                <div className="relative">
                    <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-72 object-cover rounded-t-lg"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {product.name}
                  </h2>
                  <p className="mt-2 text-gray-600">${product.price.toFixed(2)}</p>
                  <Link href={`/products/${product.id}`}>
                    <span className="block mt-4 text-center px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition cursor-pointer">
                      Shop Now
                    </span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>
    </main>
  );
}
