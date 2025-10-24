import React from "react";
import { Plane } from "lucide-react";

export default function Settings() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-2 sticky top-0 z-20">
        <a href="/" className="bg-blue-600 rounded-lg p-2">
          <Plane className="w-6 h-6 text-white" />
        </a>
        <span className="font-bold text-lg">Settings</span>
      </div>
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h1 className="text-xl font-bold mb-2">User Settings</h1>
          <p className="text-gray-600">This is a placeholder. Tell me what you want here and I will build it.</p>
        </div>
      </div>
    </div>
  );
}
