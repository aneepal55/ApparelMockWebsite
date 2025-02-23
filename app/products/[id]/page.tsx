"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../../context/CartContext";
import { motion } from "framer-motion";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: "Men" | "Women" | "Accessories";
  description: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Classic Blazer",
    price: 129.99,
    image: "/clothes1.jpg",
    category: "Men",
    description:
      "A tailored classic blazer that exudes sophistication. Crafted from premium fabric, it perfectly balances tradition with modern design.",
  },
  {
    id: 2,
    name: "Elegant Dress",
    price: 159.99,
    image: "/clothes2.jpg",
    category: "Women",
    description:
      "An elegant dress that combines refined style with a contemporary twist. Perfect for upscale occasions and special events.",
  },
  {
    id: 3,
    name: "Modern Trousers",
    price: 89.99,
    image: "/clothes3.jpg",
    category: "Men",
    description:
      "Modern trousers designed with a slim fit and high-quality fabric, ensuring a comfortable yet stylish look for everyday wear.",
  },
  {
    id: 4,
    name: "Stylish Jacket",
    price: 199.99,
    image: "/clothes4.jpg",
    category: "Men",
    description:
      "A stylish jacket featuring a contemporary cut and versatile design, ideal for both casual outings and formal occasions.",
  },
  {
    id: 5,
    name: "Trendy Shirt",
    price: 69.99,
    image: "/clothes5.jpg",
    category: "Women",
    description:
      "A trendy shirt that combines comfort and style. Its chic design is perfect for updating your everyday wardrobe.",
  },
  {
    id: 6,
    name: "Chic Top",
    price: 49.99,
    image: "/clothes6.jpg",
    category: "Women",
    description:
      "A chic top with a modern edge, designed to bring a touch of sophistication to any outfit.",
  },
  {
    id: 7,
    name: "Designer Jeans",
    price: 109.99,
    image: "/clothes7.jpg",
    category: "Men",
    description:
      "Premium designer jeans crafted with attention to detail. Enjoy the perfect blend of comfort and cutting-edge style.",
  },
  {
    id: 8,
    name: "Casual Hoodie",
    price: 79.99,
    image: "/clothes8.jpg",
    category: "Accessories",
    description:
      "A casual hoodie made from soft, durable fabric. Its relaxed fit and modern design make it a versatile addition to any wardrobe.",
  },
];

type PageProps = {
  params: { id: string };
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ProductDetailPage({ params }: PageProps) {
  const productId = parseInt(params.id, 10);

  // Call hooks unconditionally at the top
  const [selectedSize, setSelectedSize] = useState("M");
  const { addToCart, isInCart } = useCart();

  const product = products.find((p) => p.id === productId);
  if (!product) {
    return notFound();
  }

  const handleAddToCart = () => {
    if (!isInCart(product.id)) {
      addToCart({ id: product.id, size: selectedSize });
    }
  };

  return (
    <motion.main
      className="min-h-screen bg-gray-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants}>
          <Link href="/products">
            <span className="text-gray-600 hover:text-teal-500 mb-6 inline-block">
              &larr; Back to Products
            </span>
          </Link>
        </motion.div>
        <motion.div
          className="bg-white rounded-lg shadow-lg overflow-hidden"
          variants={itemVariants}
        >
          <div className="md:flex">
            {/* Left Side: Product Image */}
            <motion.div className="md:w-1/2" variants={itemVariants}>
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={600}
                className="object-cover"
              />
            </motion.div>
            {/* Right Side: Product Details */}
            <motion.div className="md:w-1/2 p-8 flex flex-col" variants={itemVariants}>
              <h1 className="text-3xl font-extrabold text-gray-900">
                {product.name}
              </h1>
              <p className="mt-2 text-2xl text-gray-600">
                ${product.price.toFixed(2)}
              </p>
              <div className="mt-4">
                <span className="text-gray-700">Category: </span>
                <span className="text-gray-900 font-medium">
                  {product.category}
                </span>
              </div>
              <div className="mt-6">
                <p className="text-gray-700">{product.description}</p>
              </div>
              <div className="mt-8">
                <label
                  htmlFor="size"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Select Size
                </label>
                <select
                  id="size"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-teal-500"
                >
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </div>
              <div className="mt-8">
                <button
                  onClick={handleAddToCart}
                  disabled={isInCart(product.id)}
                  className={`w-full md:w-auto px-8 py-3 font-semibold rounded-md transition ${
                    isInCart(product.id)
                      ? "bg-teal-300 cursor-not-allowed"
                      : "bg-teal-500 hover:bg-teal-600 text-white"
                  }`}
                >
                  {isInCart(product.id) ? "Added" : "Add to Cart"}
                </button>
              </div>
            </motion.div>
          </div>          
        </motion.div>
      </div>
    </motion.main>
  );
}
