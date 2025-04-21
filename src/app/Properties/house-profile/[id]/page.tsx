"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


interface House {
    id: number;
    area: string;
    ownerId: number;
    rentAmount: number;
    status: string;
  }

export default function ProfilePage() {
  const { id } = useParams(); 
  const router = useRouter();
  const [houseOwner, setHouseOwner] = useState<House | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetch("http://localhost:3001/properties/Profile/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: Number(id) }), 
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch house owner data");
          }
          return res.json();
        })
        .then((data: House) => {
          setHouseOwner(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold">Loading Profile...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-red-500">Error: {error}</h1>
      </div>
    );
  }

  if (!houseOwner) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold">Property Info</h1>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4">House Owner Profile</h1>

      {/* Owner Details */}
      <div className="border-b pb-4">
        <p className="text-lg"><strong>ID:</strong> {houseOwner.id}</p>
        <p className="text-lg"><strong>Name:</strong> {houseOwner.area}</p>
        <p className="text-lg"><strong>Owner Id:</strong> {houseOwner.ownerId}</p>
        <p className="text-lg"><strong>Rent Amount:</strong> {houseOwner.rentAmount}</p>
        <p className="text-lg"><strong>Status:</strong> {houseOwner.status}</p>
      </div>

      {/* Back Button */}
      <button
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => router.push("/Properties")}
      >
        Back to Properties
      </button>
    </div>
  );
}
