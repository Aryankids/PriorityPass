import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Clock, Plane, Settings, LogOut, Compass } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const [locationLabel, setLocationLabel] = useState<string>("Detecting location…");
  const [now, setNow] = useState<string>(new Date().toLocaleString());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date().toLocaleString()), 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => setLocationLabel("Baker Street, London"),
        () => setLocationLabel("Baker Street, London"),
        { enableHighAccuracy: false, maximumAge: 60_000, timeout: 5_000 },
      );
    } else {
      setLocationLabel("Baker Street, London");
    }
  }, []);

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
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 mb-4">
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span className="font-medium truncate">{locationLabel}</span>
          </div>
          <div className="mt-2 flex items-center gap-3 text-sm text-gray-700">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="font-medium">{now}</span>
          </div>
        </div>

        <div className="mb-4">
          <h1 className="text-2xl font-bold">Hello Amir,</h1>
          <p className="text-gray-600 mt-1">What would you like to do today?</p>
        </div>

        <div className="grid gap-3">
          <button
            onClick={() => navigate("/adventure")}
            className="w-full bg-white border border-gray-200 rounded-xl p-4 shadow-md text-left hover:shadow-lg transition-shadow flex items-center justify-between"
          >
            <div>
              <div className="font-semibold text-lg text-gray-900">Your Priority Pass Adventure</div>
              <div className="text-gray-600 text-sm">Explore lounges, perks, and tailored offers</div>
            </div>
            <Compass className="w-6 h-6 text-blue-600" />
          </button>

          <button
            onClick={() => navigate("/transfer", { state: { userLocationLabel: locationLabel } })}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-4 shadow-md text-left hover:shadow-lg transition-shadow flex items-center justify-between"
          >
            <div>
              <div className="font-semibold text-lg">Arrange Airport Transfer</div>
              <div className="text-blue-100 text-sm">Start a quick 2-step setup</div>
            </div>
            <Plane className="w-6 h-6" />
          </button>

          <button
            onClick={() => navigate("/settings")}
            className="w-full bg-white rounded-xl p-4 shadow-md text-left hover:shadow-lg transition-shadow flex items-center justify-between"
          >
            <div>
              <div className="font-semibold text-lg">User Settings</div>
              <div className="text-gray-600 text-sm">Manage preferences</div>
            </div>
            <Settings className="w-6 h-6 text-gray-600" />
          </button>

          <button
            onClick={() => navigate("/logout")}
            className="w-full bg-white rounded-xl p-4 shadow-md text-left hover:shadow-lg transition-shadow flex items-center justify-between"
          >
            <div>
              <div className="font-semibold text-lg">Log out</div>
              <div className="text-gray-600 text-sm">Sign out of your account</div>
            </div>
            <LogOut className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </main>
    </div>
  );
}
