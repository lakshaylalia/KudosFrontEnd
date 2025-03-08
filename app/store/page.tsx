"use client";
import SideBarComp from '@/components/SideBarComp';
import { useState, useEffect } from 'react';
import { useKudosContext } from '@/context/KudosContext';

export default function Page() {
  const { kudos, setKudos } = useKudosContext();

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
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-screen flex bg-white text-gray-900">
      <SideBarComp />
      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Top Bar */}
        <div className="fixed top-0 w-full flex sm:flex-row items-center bg-white shadow-sm p-4 gap-4 sm:gap-20 z-10">
          <p className="text-xl font-semibold text-blue-800 bg-blue-100 px-4 py-2 rounded-lg shadow-md">
            Kudos: {kudos}
          </p>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="hidden md:inline-block px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
          />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {loading ? (
              <>
                {/* Skeleton Loader */}
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 p-6 rounded-2xl shadow-lg border border-gray-300 animate-pulse flex flex-col justify-between"
                  >
                    <div className="w-full h-40 bg-gray-300 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-5/6 mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2 mb-4"></div>
                    <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
                    <div className="h-10 bg-gray-300 rounded w-full"></div>
                  </div>
                ))}
              </>
            ) : filteredData.length > 0 ? (
              filteredData.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-100 p-6 rounded-2xl shadow-lg border border-gray-300 hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    width={500}
                    height={400}
                    className="w-full h-40 object-contain rounded-lg"
                  />
                  <h2 className="text-lg font-semibold mt-3 text-gray-900">{item.title}</h2>
                  <p className="text-sm text-gray-700 mt-2 line-clamp-3">{item.description}</p>
                  <p className="text-xl font-bold text-blue-600 mt-3">{item.price.toFixed(2)}</p>
                  <button
                    className="mt-5 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
                    onClick={() => {
                      console.log("Buy now clicked");
                      if (kudos >= item.price) {
                        setKudos(kudos - item.price);
                        console.log(kudos);
                      } else {
                        alert("You don't have enough kudos");
                      }
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-xl font-semibold text-gray-600">No data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
