"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';


interface HouseOwner {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
}

export default function Home() {

  const logout = () => {
    Cookies.remove('token');
    router.push("/");

};
  
  const [search, setSearch] = useState<string>("");
  const [houseOwners, setHouseOwners] = useState<HouseOwner[]>([]);
  const router = useRouter(); 

  useEffect(() => {

    fetch("http://localhost:3001/houseowner/all")
      .then((res) => res.json())
      .then((data: HouseOwner[]) => setHouseOwners(data))
      .catch((err) => console.error("Error fetching house owners:", err));
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-purple-700 text-white p-5">
        <nav>
          <ul>
            <li className="p-2 rounded hover:bg-purple-800 cursor-pointer">
              <Link href="/Dashboard">Dashboard</Link>
            </li>
            <li className="p-2 rounded hover:bg-purple-800 cursor-pointer">
              <Link href="/Service">Service Provider</Link>
            </li>
            <li className="p-2 rounded hover:bg-purple-800 cursor-pointer">
              <Link href="/Houseowner">House Owner</Link>
            </li>
            <li className="p-2 rounded hover:bg-purple-800 cursor-pointer">
              <Link href="/Customer">Customer</Link>
            </li>
            <li className="p-2 rounded hover:bg-purple-800 cursor-pointer">
              <Link href="/Properties">Properties</Link>
            </li>
            <li className="p-2 rounded hover:bg-purple-800 cursor-pointer">
              <Link href="/Payment">Payment</Link>
            </li>
          </ul>
        </nav>
        <button className="mt-10 bg-red-500 px-4 py-2 rounded w-full" onClick={logout}>Logout</button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-4">House Owner</h1>
        <div className="mb-4">
          <label htmlFor="search" className="mr-2 font-medium">Search:</label>
          <input
            type="text"
            id="search"
            placeholder="Search by Name"
            className="w-60 h-8 px-2 border border-gray-400 rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
        <table className="border border-gray-400 w-full bg-white shadow-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 px-4 py-2">ID</th>
                <th className="border border-gray-400 px-4 py-2">Name</th>
                <th className="border border-gray-400 px-4 py-2">Email</th>
                <th className="border border-gray-400 px-4 py-2">Phone Number</th>
                <th className="border border-gray-400 px-4 py-2">Profile</th>
              </tr>
            </thead>
            <tbody>
              {houseOwners
                .filter((owner) =>
                  owner.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((owner) => (
                  <tr key={owner.id} className="hover:bg-gray-100">
                    <td className="border border-gray-400 px-4 py-2">{owner.id}</td>
                    <td className="border border-gray-400 px-4 py-2">{owner.name}</td>
                    <td className="border border-gray-400 px-4 py-2">{owner.email}</td>
                    <td className="border border-gray-400 px-4 py-2">{owner.phoneNumber}</td>
                    <td className="border border-gray-400 px-4 py-2 text-center">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        onClick={() => router.push(`Houseowner/profile/${owner.id}`)}
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
