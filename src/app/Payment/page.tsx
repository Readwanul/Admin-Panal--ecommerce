"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Payment {
  tid: number;
  totalAmount: number;
  platformCharge: number;
  status: string;
  transactionToId: number;
}

export default function Home() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const router = useRouter(); 

  useEffect(() => {
    fetch("http://localhost:3001/transection/all")
      .then((res) => res.json())
      .then((data: Payment[]) => setPayments(data))
      .catch((err) => {
        console.error("Error fetching payments:", err);
      });
  }, []);

  const handlePay = (tid: number) => {
    fetch(`http://localhost:3001/transaction/action`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: tid,       
        status: "Completed", 
      }),
    })
    .then((res) => res.json())
      .then((updatedPayment) => {
        setPayments((prevPayments) =>
          prevPayments.map((payment) =>
            payment.tid === tid ? { ...payment, status: updatedPayment.status } : payment
          )
        );
      })
      .catch((err) => {
        console.error("Error updating status:", err);
      });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-purple-700 text-white p-5">
        <nav>
          <ul>
            <a href="/Dashboard">
              <li className="p-2 rounded hover:bg-purple-800 cursor-pointer">Dashboard</li>
            </a>
            <a href="/Service">
              <li className="p-2 rounded hover:bg-purple-800 cursor-pointer">Service Provider</li>
            </a>
            <a href="/Houseowner">
              <li className="p-2 rounded hover:bg-purple-800 cursor-pointer">House Owner</li>
            </a>
            <a href="/Customer">
              <li className="p-2 rounded hover:bg-purple-800 cursor-pointer">Customer</li>
            </a>
            <a href="/Properties">
              <li className="p-2 rounded hover:bg-purple-800 cursor-pointer">Properties</li>
            </a>
            <a href="/Payment">
              <li className="p-2 rounded hover:bg-purple-800 cursor-pointer">Payment</li>
            </a>
          </ul>
        </nav>
        <button className="mt-10 bg-red-500 px-4 py-2 rounded w-full">
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-4">Payments</h1>

        <div className="grid grid-cols-1 gap-4 mt-5">
          <table className="min-w-full border-collapse table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 px-4 py-2">ID</th>
                <th className="border border-gray-400 px-4 py-2">Total Amount</th>
                <th className="border border-gray-400 px-4 py-2">Platform Charge</th>
                <th className="border border-gray-400 px-4 py-2">Status</th>
                <th className="border border-gray-400 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.tid} className="hover:bg-gray-100">
                  <td className="border border-gray-400 px-4 py-2">{payment.tid}</td>
                  <td className="border border-gray-400 px-2 py-2">{payment.totalAmount}</td>
                  <td className="border border-gray-400 px-2 py-2">{payment.platformCharge}</td>
                  <td className="border border-gray-400 px-2 py-2">{payment.status}</td>
                  <td className="border border-gray-400 px-4 py-2 text-center">
                  <button
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        onClick={() => handlePay(payment.tid)}
                      >
                        Pay
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
