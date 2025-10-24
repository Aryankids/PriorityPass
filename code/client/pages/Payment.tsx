import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CreditCard, ShieldCheck, Plane } from "lucide-react";

export default function Payment() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: any };
  const amount: string = state?.amount || "£0";
  const vehicle: string | undefined = state?.vehicleType;
  const pickupAt: string | undefined = state?.pickupAt;

  const [method, setMethod] = useState<"stored" | "new">("stored");

  const payLabel = useMemo(() => `Pay ${amount}`, [amount]);

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
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold">Complete Payment</h1>
              <p className="text-gray-600 mt-1">{vehicle ? `${vehicle} airport transfer` : "Airport transfer"}{pickupAt ? ` · Pickup ${pickupAt}` : ""}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Amount</p>
              <p className="text-2xl font-extrabold">{amount}</p>
            </div>
          </div>

          <div className="rounded-xl border border-blue-200 bg-blue-50 p-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <p className="text-sm text-blue-900">Payments securely processed by <span className="font-semibold">Stripe UK</span>.</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <input id="stored" type="radio" name="method" checked={method === "stored"} onChange={() => setMethod("stored")} className="h-4 w-4" />
              <label htmlFor="stored" className="flex-1 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-gray-700" />
                    <span className="font-medium">Use stored card</span>
                  </div>
                  <span className="text-sm text-gray-600">Visa •••• 4242</span>
                </div>
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input id="new" type="radio" name="method" checked={method === "new"} onChange={() => setMethod("new")} className="h-4 w-4" />
              <label htmlFor="new" className="font-medium cursor-pointer">Add a new card</label>
            </div>

            {method === "new" && (
              <div className="grid gap-3 mt-1">
                <input placeholder="Cardholder name" className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
                <input placeholder="Card number" inputMode="numeric" className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="MM/YY" className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
                  <input placeholder="CVC" inputMode="numeric" className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button onClick={() => navigate(-1)} className="rounded-lg px-4 py-2 font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100">Back</button>
            <button className="rounded-lg bg-blue-600 text-white px-5 py-2.5 font-semibold hover:bg-blue-700">{payLabel}</button>
          </div>
        </div>
      </main>
    </div>
  );
}
