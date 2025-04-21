"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';


export default function Dashboard() {

  const logout = () => {
    Cookies.remove('token');
    router.push("/");

};
    const router = useRouter();
    return (
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-purple-700 text-white p-5">
        <nav>
            <ul>
                <a href="/Dashboard">
              <li className="p-2 rounded hover:bg-purple-800 cursor-pointer">Dashboard</li></a>
              <a href="/Service">
              <li className="p-2 rounded hover:bg-purple-800 cursor-pointer">Service Provider</li></a>
              <a href="/Houseowner">
              <li className="p-2 rounded hover:bg-purple-800 cursor-pointer">House Owner</li></a>
              <a href="/Customer">
              <li className="p-2 rounded hover:bg-purple-800 cursor-pointer">Customer</li></a>
              <a href="/Properties">
              <li className="p-2 rounded hover:bg-purple-800 cursor-pointer">Properties</li></a>
              <a href="/Payment">
              <li className="p-2 rounded hover:bg-purple-800 cursor-pointer">Payment</li></a>
              
            </ul>
          </nav>
          <button className="mt-10 bg-red-500 px-4 py-2 rounded w-full" onClick={logout}>
            Logout
          </button>
        </aside>
  
        {/* Main Content */}
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-semibold mb-4">Overview</h1>
  
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <li className="bg-white p-4 rounded shadow-md text-center">
              <p className="text-gray-500 text-sm">House Confirmation</p>
              <p className="text-2xl font-semibold">1.45k</p>
            </li>
            <li className="bg-white p-4 rounded shadow-md text-center">
              <p className="text-gray-500 text-sm">New Houses</p>
              <p className="text-2xl font-semibold">600</p>
            </li>
            <li className="bg-white p-4 rounded shadow-md text-center">
              <p className="text-gray-500 text-sm">Total No. of Servicemen</p>
              <p className="text-2xl font-semibold">500</p>
            </li>
            <li className="bg-white p-4 rounded shadow-md text-center">
              <p className="text-gray-500 text-sm">New Customers</p>
              <p className="text-2xl font-semibold">1.03k</p>
            </li>
          </div>
  
          {/* Content Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Top Service Provider */}
            <div className="bg-white p-4 rounded shadow-md h-60">
              <h2 className="text-lg font-semibold">Top Service Provider</h2>
              <div className="mt-4 h-40 bg-gray-200 rounded"></div>
            </div>
  
            {/* Revenue Overview */}
            <div className="bg-white p-4 rounded shadow-md h-60">
              <h2 className="text-lg font-semibold">Revenue Overview</h2>
              <div className="mt-4 h-40 bg-gradient-to-r from-blue-400 to-blue-200 rounded"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }
  