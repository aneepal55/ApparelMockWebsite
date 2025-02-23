"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const heroVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.8, ease: "easeOut" } 
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, delay: 0.3 } 
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 * i, duration: 0.6 },
  }),
};

const featuredProducts = [
  {
    id: 3,
    name: "Modern Trousers",
    price: 89.99,
    image: "/clothes3.jpg",
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
    id: 8,
    name: "Casual Hoodie",
    price: 79.99,
    image: "/clothes8.jpg",
    category: "Accessories",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative">
        <motion.div initial="hidden" animate="visible" variants={heroVariants}>
          <Image
            src="/hero.jpg"
            alt="Fashionable clothing"
            width={1920}
            height={600}
            className="w-full h-[600px] object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center">
          <motion.h2
            className="text-4xl md:text-6xl font-extrabold text-white text-center"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            Elevate Your Style
          </motion.h2>
          <motion.p
            className="mt-4 text-lg md:text-2xl text-white text-center max-w-xl"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            Discover the latest trends in fashion with our exclusive collections.
          </motion.p>
          <Link href="/products">
            <motion.span
              className="mt-8 inline-block px-8 py-3 bg-teal-500 text-white font-semibold rounded-md shadow-lg hover:bg-teal-600 transition cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Browse
            </motion.span>
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h3
            className="text-3xl font-bold text-gray-800 text-center mb-12"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            Featured Products
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={cardVariants}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full h-64 object-cover rounded-md"
                />
                <h4 className="mt-4 text-2xl font-semibold text-gray-800">
                  {product.name}
                </h4>
                <p className="mt-2 text-gray-600">$ {product.price.toFixed(2)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
