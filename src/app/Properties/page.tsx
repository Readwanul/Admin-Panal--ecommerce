"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

interface House {
  id: number;
  area: string;
  ownerId: number;
  rentAmount: number;
  status: string;
}

export default function Home() {

  const layout = () => {
      Cookies.remove('token');
      router.push("/");

  };

  const [houses, setHouses] = useState<House[]>([]);
  const router = useRouter();


  useEffect(() => {
    const fetchHouses = async () => {
      const response = await fetch("http://localhost:3001/properties/all");
      const data: House[] = await response.json();
      setHouses(data);
    };

    fetchHouses();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-purple-700 text-white p-5">
        <nav>
          <ul>
            <a href="/Dashboard">
              <li className="p-2 rounded hover:bg-purple-800 cursor-pointer">
                Dashboard
              </li>
            </a>
            <a href="/Service">
              <li className="p-2 rounded hover:bg-purple-800 cursor-pointer">
                Service Provider
              </li>
            </a>
            <a href="/Houseowner">
              <li className="p-2 rounded hover:bg-purple-800 cursor-pointer">
                House Owner
              </li>
            </a>
            <a href="/Customer">
              <li className="p-2 rounded hover:bg-purple-800 cursor-pointer">
                Customer
              </li>
            </a>
            <a href="/Properties">
              <li className="p-2 rounded hover:bg-purple-800 cursor-pointer">
                Properties
              </li>
            </a>
            <a href="/Payment">
              <li className="p-2 rounded hover:bg-purple-800 cursor-pointer">
                Payment
              </li>
            </a>
          </ul>
        </nav>
        <button className="mt-10 bg-red-500 px-4 py-2 rounded w-full" onClick={layout}>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-4">Properties</h1>

        <div className="overflow-x-auto">
          <table className="border border-gray-400 w-full bg-white shadow-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 px-4 py-2">ID</th>
                <th className="border border-gray-400 px-4 py-2">Area</th>
                <th className="border border-gray-400 px-4 py-2">Owner Id</th>
                <th className="border border-gray-400 px-4 py-2">Rent Amount</th>
                <th className="border border-gray-400 px-4 py-2">Status</th>
                <th className="border border-gray-400 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {houses.length > 0 ? (
                houses.map((house) => (
                  <tr key={house.id} className="hover:bg-gray-100">
                    <td className="border border-gray-400 px-4 py-2">{house.id}</td>
                    <td className="border border-gray-400 px-10 py-2">{house.area}</td>
                    <td className="border border-gray-400 px-4 py-2">{house.ownerId}</td>   
                    <td className="border border-gray-400 px-4 py-2">{house.rentAmount}</td>
                    <td className="border border-gray-400 px-4 py-2">{house.status}</td>
                    <td className="border border-gray-400 px-4 py-2">
                      <button
                        onClick={() => router.push(`Properties/house-profile/${house.id}`)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Info
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="border border-gray-400 px-4 py-2 text-center">
                    No houses available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
