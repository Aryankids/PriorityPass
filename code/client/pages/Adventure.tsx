import React from "react";
import { useNavigate } from "react-router-dom";
import { Plane, Compass } from "lucide-react";

export default function Adventure() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="bg-blue-600 rounded-lg p-2 text-white">
              <Plane className="w-6 h-6" />
            </div>
            <span className="font-bold text-lg">Priority Pass</span>
          </a>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 pb-24">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Compass className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold">Your Priority Pass Adventure</h1>
          </div>
          <p className="text-gray-600 mb-4">Discover lounges, perks, and tailored offers along your journey. Tell us a bit and well curate an experience for you.</p>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/journey")} className="rounded-lg bg-blue-600 text-white px-4 py-2 font-semibold hover:bg-blue-700">Start</button>
            <button onClick={() => navigate(-1)} className="rounded-lg bg-gray-100 text-gray-800 px-4 py-2 font-semibold hover:bg-gray-200">Back</button>
          </div>
        </div>
      </main>
    </div>
  );
}
