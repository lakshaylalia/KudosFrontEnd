"use client";
import SideBarComp from '@/components/SideBarComp';
import { useState, useEffect } from 'react';


export default function Page() {

  const fetchData = async () => {
    const res = await fetch('https://fakestoreapi.com/products') // In App store api
    const data = await res.json();
    setData(data);
    console.log(data);
  }
  interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    image: string;
  }

  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    fetchData();
  },[]);
  return (
    <div className="w-full h-screen flex">
      <SideBarComp />
      <div className='cards max-w-5xl mx-auto px-2 overflow-y-scroll grid grid-cols-2'>
        {Array.isArray(data) ? (
          data.map((item) => (
            <div className='card bg-blue-500 text-white border-2' key={item.id}>
              <img src={item.image} alt="image" className='w-20 h-20' />
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <p>{item.price}</p>
              <p>{item.category}</p>
            </div>
          ))
        ) : (
          <p>Loading or no data available</p>
        )}
      </div>
    </div>

  )
};
