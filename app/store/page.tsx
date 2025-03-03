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
    <div className="w-full h-screen flex bg-gray-50">
      <SideBarComp />
      <div className="cards max-w-6xl mx-auto px-6 py-8 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {loading ? (
          <p className="text-center text-xl font-semibold text-gray-700">Loading products...</p>
        ) : data.length > 0 ? (
          data.map((item) => (
            <div 
              key={item.id} 
              className="card bg-white p-6 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className="w-full flex justify-center">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-36 h-36 object-contain rounded-lg"
                />
              </div>
              <h2 className="text-lg font-semibold mt-3 text-gray-800">{item.title}</h2>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
              <p className="text-lg font-bold text-blue-600 mt-3">${item.price.toFixed(2)}</p>
              <span className="inline-block mt-3 px-4 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                {item.category}
              </span>
              <button className="mt-5 w-full bg-red-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all duration-200">
                View Details
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-xl font-semibold text-gray-700">No data available</p>
        )}
      </div>
    </div>
  );
}
