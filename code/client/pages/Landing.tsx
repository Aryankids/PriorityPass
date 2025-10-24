import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Plane, Calendar, MapPin, Car } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const location = useLocation() as { state?: any };

  const [flightNumber, setFlightNumber] = useState("");
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [date, setDate] = useState("");
  const [departureAirport, setDepartureAirport] = useState("");
  const [terminal, setTerminal] = useState("");

  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");

  useEffect(() => {
    if (step === 2 && !pickup) {
      const passed = location.state?.userLocationLabel as string | undefined;
      if (passed) {
        setPickup(passed);
        return;
      }
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          () => setPickup("Current location"),
          () => setPickup("Current location"),
          { enableHighAccuracy: false, maximumAge: 60_000, timeout: 5_000 },
        );
      } else {
        setPickup("Current location");
      }
    }
  }, [step, pickup, location.state]);

  useEffect(() => {
    if (step === 2) {
      const computed = departureAirport
        ? `${departureAirport}${terminal ? ` ${terminal}` : ""}`
        : `${fromCity ? fromCity + " Airport Departures" : "Airport Departures"}`;
      setDropoff((prev) => prev || computed);
    }
  }, [step, fromCity, departureAirport, terminal]);

  const canNext = useMemo(() => !!flightNumber && !!fromCity && !!toCity && !!date, [flightNumber, fromCity, toCity, date]);
  const canFinish = useMemo(() => !!pickup && !!dropoff, [pickup, dropoff]);

  const goNext = () => setStep(2);

  const finish = () => {
    navigate("/journey", {
      state: {
        flight: {
          flightNumber,
          date,
          destination: toCity,
          terminal: terminal || undefined,
        },
        fromCity,
        toCity,
        pickup,
        dropoff,
      },
    });
  };

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

      <main className="max-w-2xl mx-auto p-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl sm:text-2xl font-bold">Arrange an Airport Transfer</h1>
            <div className="flex items-center gap-2 text-sm">
              <span className={`h-2 w-2 rounded-full ${step >= 1 ? "bg-blue-600" : "bg-gray-300"}`} />
              <span className={`h-2 w-2 rounded-full ${step >= 2 ? "bg-blue-600" : "bg-gray-300"}`} />
            </div>
          </div>

          {step === 1 && (
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Flight number</label>
                <div className="flex items-center gap-2">
                  <input
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    placeholder="e.g. BA 287"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">From city (Departure)</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3 top-2.5 text-gray-500" />
                    <input
                      value={fromCity}
                      onChange={(e) => setFromCity(e.target.value)}
                      placeholder="e.g. London"
                      className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">To city (Arrival)</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3 top-2.5 text-gray-500" />
                    <input
                      value={toCity}
                      onChange={(e) => setToCity(e.target.value)}
                      placeholder="e.g. San Francisco"
                      className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Departure airport</label>
                  <input
                    value={departureAirport}
                    onChange={(e) => setDepartureAirport(e.target.value)}
                    placeholder="e.g. London Heathrow"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Terminal (optional)</label>
                  <input
                    value={terminal}
                    onChange={(e) => setTerminal(e.target.value)}
                    placeholder="e.g. Terminal 5"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3 top-2.5 text-gray-500" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  disabled={!canNext}
                  onClick={goNext}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 font-semibold text-white ${
                    canNext ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-900">
                Based on your flight to {toCity || "—"}, we pre-filled your drop-off. You can adjust below.
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Pickup location</label>
                  <div className="relative">
                    <Car className="w-4 h-4 absolute left-3 top-2.5 text-gray-500" />
                    <input
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      placeholder="Current location"
                      className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Drop-off location</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3 top-2.5 text-gray-500" />
                    <input
                      value={dropoff}
                      onChange={(e) => setDropoff(e.target.value)}
                      placeholder="e.g. Heathrow T5 Departures"
                      className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button onClick={() => setStep(1)} className="rounded-lg px-4 py-2 font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100">Back</button>
                <button
                  disabled={!canFinish}
                  onClick={finish}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 font-semibold text-white ${
                    canFinish ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  See your tailored journey
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
