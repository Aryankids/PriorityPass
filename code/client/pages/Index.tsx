import React, { useMemo, useState } from "react";
import { Plane, Car, Clock, MapPin, Calendar, User, Coffee, Home, Settings as SettingsIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

function timeToMinutes(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function addMinutes(base: Date, mins: number) {
  const d = new Date(base);
  d.setMinutes(d.getMinutes() + mins);
  return d;
}

function formatHM(d: Date) {
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
}

type VehicleCardProps = {
  type: string;
  capacity: string;
  price: string;
  eta: string;
  recommended?: boolean;
  onSelect?: () => void;
};

const VehicleCard: React.FC<VehicleCardProps> = ({ type, capacity, price, eta, recommended, onSelect }) => (
  <div className={`bg-white rounded-xl p-4 border-2 ${recommended ? "border-blue-500" : "border-gray-200"} relative`}>
    {recommended && (
      <span className="absolute -top-2 right-4 bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
        Recommended
      </span>
    )}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-gray-100 rounded-lg p-3">
          <Car className="w-6 h-6 text-gray-700" />
        </div>
        <div>
          <p className="font-bold text-lg">{type}</p>
          <p className="text-sm text-gray-600">{capacity}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-lg">{price}</p>
        <p className="text-sm text-gray-600">{eta} away</p>
      </div>
    </div>
    <button onClick={onSelect} className="w-full bg-blue-600 text-white rounded-lg py-3 font-semibold mt-3 hover:bg-blue-700 transition-colors">
      Select Vehicle
    </button>
  </div>
);

type LoungeCardProps = {
  name: string;
  terminal: string;
  distance: string;
  amenities: string;
  crowding: "Quiet" | "Moderate" | "Busy";
};

const LoungeCard: React.FC<LoungeCardProps> = ({ name, terminal, distance, amenities, crowding }) => (
  <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
    <div className="flex items-start justify-between mb-3">
      <div className="flex-1">
        <p className="font-bold text-lg">{name}</p>
        <p className="text-sm text-gray-600">{terminal} · {distance}</p>
      </div>
      <span className={`text-xs px-2 py-1 rounded-full ${
        crowding === "Quiet" ? "bg-green-100 text-green-800" :
        crowding === "Moderate" ? "bg-yellow-100 text-yellow-800" :
        "bg-red-100 text-red-800"
      }`}>
        {crowding}
      </span>
    </div>
    <p className="text-sm text-gray-700 mb-3">{amenities}</p>
    <button className="w-full bg-purple-600 text-white rounded-lg py-3 font-semibold hover:bg-purple-700 transition-colors">
      Reserve Spot
    </button>
  </div>
);

type PhaseCardProps = {
  title: string;
  time: string;
  subtitle: string;
  icon: React.ReactNode;
  accent: "blue" | "green" | "purple" | "orange" | "slate";
  status: "completed" | "current" | "upcoming";
  cta?: { label: string; onClick?: () => void };
  ad?: React.ReactNode;
  connectTop?: boolean;
  connectBottom?: boolean;
};

const PhaseCard: React.FC<PhaseCardProps> = ({ title, time, subtitle, icon, accent, status, cta, ad, connectTop, connectBottom }) => {
  const ring =
    accent === "green" ? "ring-green-500" :
    accent === "purple" ? "ring-purple-500" :
    accent === "orange" ? "ring-orange-500" :
    accent === "slate" ? "ring-slate-400" :
    "ring-blue-600";

  const badgeStyles =
    status === "completed"
      ? "bg-green-100 text-green-800"
      : status === "current"
      ? "bg-blue-100 text-blue-800"
      : "bg-gray-100 text-gray-700";

  return (
    <div className={`bg-white rounded-2xl p-5 shadow-sm border border-gray-200 transition-shadow hover:shadow-md ring-1 ${ring}/20`}>
      <div className="flex items-start gap-3">
        <div className="relative w-10 flex flex-col items-center">
          {connectTop && <span className="absolute left-1/2 -translate-x-1/2 top-0 bottom-1/2 w-px bg-blue-200" />}
          <div className={`${
            accent === "green" ? "bg-green-500" :
            accent === "purple" ? "bg-purple-600" :
            accent === "orange" ? "bg-orange-500" :
            accent === "slate" ? "bg-slate-500" :
            "bg-blue-600"
          } w-10 h-10 rounded-xl flex items-center justify-center text-white z-20`}>
            {icon}
          </div>
          {connectBottom && <span className="absolute left-1/2 -translate-x-1/2 top-1/2 bottom-0 w-px bg-blue-200" />}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-bold text-gray-900">{title}</h4>
            <span className={`text-[11px] px-2 py-0.5 rounded-full ${badgeStyles}`}>
              {status === "completed" ? "Done" : status === "current" ? "Now" : "Upcoming"}
            </span>
          </div>
          <div className="mt-1 text-sm text-gray-600">{subtitle}</div>
          <div className="mt-2 text-sm font-semibold text-gray-900">{time}</div>
          {(cta || ad) && (
            <div className="mt-4 flex items-center gap-3">
              {cta && (
                <button onClick={cta.onClick} className="inline-flex items-center justify-center rounded-lg bg-blue-600 text-white px-3 py-2 text-sm font-semibold hover:bg-blue-700 transition-colors">
                  {cta.label}
                </button>
              )}
              {ad && <div className="ml-auto">{ad}</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Index() {
  const [activeTab, setActiveTab] = useState<"journey" | "lounges" | "rides">("journey");
  const [bookingStep, setBookingStep] = useState<"overview" | "taxi" | "lounge">("overview");

  const location = useLocation() as { state?: any };
  const overrides = location.state?.flight ?? {};

  const nowDate = new Date();
  const departureDate = addMinutes(nowDate, 210);

  const flightData = {
    flightNumber: overrides.flightNumber || "BA 287",
    departure: formatHM(departureDate),
    destination: overrides.destination || "London Heathrow (LHR)",
    terminal: overrides.terminal || "Terminal 5",
    gate: "A23",
    date: overrides.date || departureDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
  };

  const timeline = {
    taxiPickup: formatHM(addMinutes(nowDate, 15)),
    arrivalAtAirport: formatHM(addMinutes(nowDate, 75)),
    loungeEntry: formatHM(addMinutes(nowDate, 90)),
    suggestedGateDeparture: formatHM(addMinutes(departureDate, -30)),
    boarding: formatHM(addMinutes(departureDate, -20)),
    departure: formatHM(departureDate),
  } as const;

  const phases = useMemo(() => {
    const items = [
      {
        key: "ride",
        title: "Taxi Pickup",
        time: timeline.taxiPickup,
        subtitle: "From your location",
        icon: <Car className="w-5 h-5" />,
        accent: "green" as const,
        cta: { label: "Book Taxi", onClick: () => setBookingStep("taxi") },
      },
      {
        key: "airport",
        title: "Arrive at Airport",
        time: timeline.arrivalAtAirport,
        subtitle: `${flightData.terminal} · 2h 15m before flight`,
        icon: <MapPin className="w-5 h-5" />,
        accent: "blue" as const,
        cta: { label: "Get Directions" },
        ad: (
          <div className="flex flex-col items-end gap-1">
            <a
              href="https://www.samsonite.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-20 h-20 rounded-lg bg-white ring-2 ring-blue-300 shadow-md shadow-blue-100 p-1.5 overflow-hidden shrink-0"
              aria-label="Samsonite 20% off for Priority Pass"
            >
              <img
                src="https://1000logos.net/wp-content/uploads/2020/08/Samsonite-Logo.png"
                alt="Samsonite"
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </a>
            <p className="text-[10px] font-semibold text-blue-900 text-right leading-tight">Samsonite 20% off — just for you</p>
            <p className="text-[9px] text-blue-700 text-right leading-tight">Exclusive for Priority Pass members at T5</p>
          </div>
        ),
      },
      {
        key: "lounge",
        title: "Priority Pass Lounge",
        time: timeline.loungeEntry,
        subtitle: overrides.terminal ? `Relax before your flight · ${overrides.terminal}` : "Relax before your flight",
        icon: <Coffee className="w-5 h-5" />,
        accent: "purple" as const,
        cta: { label: "Book Lounge", onClick: () => setBookingStep("lounge") },
        ad: (
          <div className="flex flex-col items-end gap-1">
            <a
              href="https://www.nike.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-20 h-20 rounded-lg bg-white ring-2 ring-purple-300 shadow-md shadow-purple-100 p-1.5 overflow-hidden shrink-0"
              aria-label="Nike 20% off for Priority Pass"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" alt="Nike" className="w-full h-full object-contain" loading="lazy" />
            </a>
            <p className="text-[10px] font-semibold text-purple-900 text-right leading-tight">Nike 20% off — just for you</p>
            <p className="text-[9px] text-purple-800 text-right leading-tight">In-store at T5 and online today</p>
          </div>
        ),
      },
      {
        key: "gate",
        title: "Leave for Gate",
        time: timeline.suggestedGateDeparture,
        subtitle: `Gate ${flightData.gate}`,
        icon: <Clock className="w-5 h-5" />,
        accent: "orange" as const,
        cta: { label: "Open Gate Info" },
      },
      {
        key: "flight",
        title: "Flight Departure",
        time: timeline.departure,
        subtitle: flightData.flightNumber,
        icon: <Plane className="w-5 h-5" />,
        accent: "slate" as const,
        cta: { label: "View Boarding Pass" },
      },
    ];

    const withStatus = items.map((it) => ({
      ...it,
      status: "upcoming" as const,
    }));

    return withStatus;
  }, [flightData.gate, flightData.terminal, flightData.flightNumber, timeline]);

  const JourneyOverview = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-blue-100 text-sm mb-1">Upcoming Flight</p>
            <h2 className="text-2xl font-bold">{flightData.flightNumber}</h2>
          </div>
          <Plane className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="font-semibold">{flightData.departure}</span>
            <span className="text-blue-100">· {flightData.date} (Delayed)</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{flightData.destination}</span>
          </div>
        </div>
      </div>

      <div className="relative space-y-3">
        <div aria-hidden className="pointer-events-none absolute left-10 top-0 bottom-0 w-px bg-blue-200"></div>
        {phases.map((p, i) => (
          <PhaseCard
            key={p.title}
            title={p.title}
            time={p.time}
            subtitle={p.subtitle}
            icon={p.icon}
            accent={p.accent}
            status={p.status}
            cta={p.cta}
            ad={p.ad}
            connectTop={i !== 0}
            connectBottom={i !== phases.length - 1}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setBookingStep("taxi")}
          className="bg-white rounded-xl p-4 shadow-md text-left hover:shadow-lg transition-shadow"
        >
          <Car className="w-8 h-8 text-green-600 mb-2" />
          <p className="font-semibold">Book Taxi</p>
          <p className="text-sm text-gray-600">Recommended pickup: {timeline.taxiPickup}</p>
        </button>

        <button
          onClick={() => setBookingStep("lounge")}
          className="bg-white rounded-xl p-4 shadow-md text-left hover:shadow-lg transition-shadow"
        >
          <Coffee className="w-8 h-8 text-purple-600 mb-2" />
          <p className="font-semibold">Book Lounge</p>
          <p className="text-sm text-gray-600">3 lounges available</p>
        </button>
      </div>
    </div>
  );

  const TaxiBooking = () => {
    const navigate = useNavigate();
    const goPay = (amount: string, vehicleType: string) => {
      navigate("/payment", { state: { amount, vehicleType, pickupAt: timeline.taxiPickup } });
    };

    return (
      <div className="space-y-4">
        <button onClick={() => setBookingStep("overview")} className="text-blue-600 font-semibold flex items-center gap-1">
          ← Back to Journey
        </button>

        <h2 className="text-2xl font-bold">Book Your Airport Taxi</h2>

        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="font-semibold text-green-900">✓ Recommended Pickup Time</p>
          <p className="text-green-800 text-lg font-bold mt-1">{timeline.taxiPickup}</p>
          <p className="text-sm text-green-700 mt-1">Based on your flight at {flightData.departure} and latest traffic update</p>
        </div>

        <div className="space-y-3">
          <VehicleCard type="Standard" capacity="3 passengers" price="£45" eta="15 min" recommended onSelect={() => goPay("£45", "Standard")} />
          <VehicleCard type="Premium" capacity="3 passengers" price="£65" eta="12 min" onSelect={() => goPay("£65", "Premium")} />
          <VehicleCard type="XL" capacity="6 passengers" price="£85" eta="18 min" onSelect={() => goPay("£85", "XL")} />
        </div>
      </div>
    );
  };

  const LoungeBooking = () => (
    <div className="space-y-4">
      {activeTab === "journey" && (
        <button onClick={() => setBookingStep("overview")} className="text-blue-600 font-semibold flex items-center gap-1">
          ← Back to Journey
        </button>
      )}

      <h2 className="text-2xl font-bold">Priority Pass Lounges</h2>

      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
        <p className="font-semibold text-purple-900">Your Membership</p>
        <p className="text-purple-800 text-lg font-bold mt-1">Unlimited Access</p>
        <p className="text-sm text-purple-700 mt-1">3 lounges available at {flightData.terminal}</p>
      </div>

      <div className="space-y-3">
        <LoungeCard
          name="Plaza Premium Lounge"
          terminal={flightData.terminal}
          distance="5 min walk from gate"
          amenities="Showers, Hot meals, WiFi"
          crowding="Moderate"
        />
        <LoungeCard
          name="No.1 Traveller"
          terminal={flightData.terminal}
          distance="3 min walk from gate"
          amenities="Bar, Snacks, WiFi"
          crowding="Busy"
        />
        <LoungeCard
          name="SkyTeam Lounge"
          terminal={flightData.terminal}
          distance="8 min walk from gate"
          amenities="Spa, Full dining, Business center"
          crowding="Quiet"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
        <a href="/" className="flex items-center gap-2">
          <div className="bg-blue-600 rounded-lg p-2">
            <Plane className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-lg">Priority Pass</span>
        </a>
        <User className="w-6 h-6 text-gray-600" />
      </div>

      <div className="max-w-2xl mx-auto p-4 pb-24">
        {activeTab === "journey" && (bookingStep === "overview" ? <JourneyOverview /> : bookingStep === "taxi" ? <TaxiBooking /> : <LoungeBooking />)}
        {activeTab === "lounges" && <LoungeBooking />}
        {activeTab === "rides" && <TaxiBooking />}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
        <div className="max-w-2xl mx-auto flex justify-around">
          <a href="/" className="flex flex-col items-center gap-1 text-gray-500 hover:text-blue-600">
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">Home</span>
          </a>
          <button
            onClick={() => {
              setActiveTab("journey");
              setBookingStep("overview");
            }}
            className={`flex flex-col items-center gap-1 ${activeTab === "journey" ? "text-blue-600" : "text-gray-500"}`}
          >
            <Calendar className="w-6 h-6" />
            <span className="text-xs font-medium">Journey</span>
          </button>
          <a href="/settings" className="flex flex-col items-center gap-1 text-gray-500 hover:text-blue-600">
            <SettingsIcon className="w-6 h-6" />
            <span className="text-xs font-medium">Settings</span>
          </a>
        </div>
      </div>
    </div>
  );
}
