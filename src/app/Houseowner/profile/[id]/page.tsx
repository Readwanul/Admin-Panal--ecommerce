"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Define the HouseOwner type
interface HouseOwner {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
}

export default function ProfilePage() {
  const { id } = useParams(); // Get house owner ID from URL
  const router = useRouter();
  const [houseOwner, setHouseOwner] = useState<HouseOwner | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetch("http://localhost:3001/houseowner/Profile/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: Number(id) }), // Send ID in request body
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch house owner data");
          }
          return res.json();
        })
        .then((data: HouseOwner) => {
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
        <h1 className="text-2xl font-semibold">House Owner Not Found</h1>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4">House Owner Profile</h1>

      {/* Owner Details */}
      <div className="border-b pb-4">
        <p className="text-lg"><strong>ID:</strong> {houseOwner.id}</p>
        <p className="text-lg"><strong>Name:</strong> {houseOwner.name}</p>
        <p className="text-lg"><strong>Email:</strong> {houseOwner.email}</p>
        <p className="text-lg"><strong>Phone:</strong> {houseOwner.phoneNumber}</p>
      </div>

      {/* Back Button */}
      <button
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => router.push("/Houseowner")}
      >
        Back to Houseowners
      </button>
    </div>
  );
}
