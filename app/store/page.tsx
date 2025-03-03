"use client";
import SideBarComp from '@/components/SideBarComp';
import { useState, useEffect } from 'react';

export default function Page() {
  interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    image: string;
  }

  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch('https://fakestoreapi.com/products');
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full h-screen flex bg-white text-gray-900">
      <SideBarComp />
      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 overflow-y-scroll">
        {loading ? (
          <p className="text-center text-xl font-semibold text-gray-600">Loading products...</p>
        ) : data.length > 0 ? (
          data.map((item) => (
            <div key={item.id} className="bg-gray-100 p-6 rounded-2xl shadow-lg border border-gray-300 hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between">
              <img src={item.image} alt={item.title} className="w-full h-40 object-contain rounded-lg" />
              <h2 className="text-lg font-semibold mt-3 text-gray-900">{item.title}</h2>
              <p className="text-sm text-gray-700 mt-2 line-clamp-3">{item.description}</p>
              <p className="text-xl font-bold text-blue-600 mt-3">${item.price.toFixed(2)}</p>
              <span className="inline-block mt-2 px-4 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                {item.category}
              </span>
              <button className="mt-5 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg">
                Buy Now
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-xl font-semibold text-gray-600">No data available</p>
        )}
      </div>
    </div>
  );
}
