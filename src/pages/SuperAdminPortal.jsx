import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Store,
  Ticket,
  Settings,
  LogOut,
  CreditCard,
  BarChart,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";


// MOCK DATA


const mockRestaurants = [
  { id: 1, name: "The Urban Kitchen", owner: "John Smith", plan: "Pro", status: "active", revenue: "₹3,45,000", orders: 3450 },
  { id: 2, name: "Pizza Paradise", owner: "Maria Garcia", plan: "Business", status: "active", revenue: "₹5,20,000", orders: 5100 },
  { id: 3, name: "Spice Route", owner: "Raj Patel", plan: "Starter", status: "trial", revenue: "₹25,000", orders: 800 },
  { id: 4, name: "Sushi Master", owner: "Yuki Tanaka", plan: "Pro", status: "suspended", revenue: "₹0", orders: 0 },
  { id: 5, name: "Burger Barn", owner: "Tom Wilson", plan: "Business", status: "active", revenue: "₹4,50,000", orders: 4200 },
];

const plans = [
  { name: "Starter", price: "₹999/mo", features: ["Basic Menu", "10 Tables", "Email Support"] },
  { name: "Pro", price: "₹2,499/mo", features: ["Unlimited Menu", "50 Tables", "Priority Support", "Analytics"] },
  { name: "Business", price: "₹4,999/mo", features: ["Everything in Pro", "Multi-location", "API Access", "Dedicated Manager"] },
];

const supportTickets = [
  { id: "TK001", restaurant: "Pizza Paradise", issue: "Payment gateway not working", status: "open", time: "2 hours ago" },
  { id: "TK002", restaurant: "Spice Route", issue: "Need help with menu setup", status: "in-progress", time: "5 hours ago" },
  { id: "TK003", restaurant: "The Urban Kitchen", issue: "QR codes not generating", status: "resolved", time: "1 day ago" },
];

export default function SuperAdminPortal() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [restaurants, setRestaurants] = useState(mockRestaurants);

  const toggleRestaurantStatus = (id) => {
    setRestaurants(prev =>
      prev.map(r =>
        r.id === id
          ? { ...r, status: r.status === "active" ? "suspended" : "active" }
          : r
      )
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* 
      SIDEBAR
      */}
      <aside className="w-64 bg-white shadow-lg p-4">
        <h2 className="text-2xl font-bold mb-8">Super Admin</h2>

        <nav className="space-y-3">
          {[
            { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
            { id: "restaurants", label: "Restaurants", icon: <Store size={18} /> },
            { id: "subscriptions", label: "Subscriptions", icon: <CreditCard size={18} /> },
            { id: "tickets", label: "Support Tickets", icon: <Ticket size={18} /> },
            { id: "settings", label: "Settings", icon: <Settings size={18} /> },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center w-full gap-3 py-2 px-3 rounded-lg text-left 
                ${activeTab === item.id ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"}
              `}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}

          <button className="flex items-center gap-3 py-2 px-3 mt-6 text-red-600 hover:bg-red-100 rounded-lg">
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>

      {/* 
      MAIN CONTENT
       */}
      <main className="flex-1 p-8">

        {/* -
        DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <>
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow">
                <h3 className="text-gray-600">Total Restaurants</h3>
                <p className="text-3xl font-bold">{restaurants.length}</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow">
                <h3 className="text-gray-600">Active</h3>
                <p className="text-3xl font-bold">
                  {restaurants.filter(r => r.status === "active").length}
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow">
                <h3 className="text-gray-600">Suspended</h3>
                <p className="text-3xl font-bold">
                  {restaurants.filter(r => r.status === "suspended").length}
                </p>
              </div>
            </div>
          </>
        )}

        {/*
        RESTAURANTS TAB
         */}
        {activeTab === "restaurants" && (
          <>
            <h1 className="text-3xl font-bold mb-6">Restaurants</h1>

            <div className="bg-white rounded-xl shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-200 text-left">
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Owner</th>
                    <th className="p-3">Plan</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Revenue</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {restaurants.map(r => (
                    <tr key={r.id} className="border-t">
                      <td className="p-3">{r.name}</td>
                      <td className="p-3">{r.owner}</td>
                      <td className="p-3">{r.plan}</td>

                      <td className="p-3">
                        {r.status === "active" ? (
                          <span className="text-green-600 flex items-center gap-2"><CheckCircle size={16} /> Active</span>
                        ) : r.status === "suspended" ? (
                          <span className="text-red-600 flex items-center gap-2"><XCircle size={16} /> Suspended</span>
                        ) : (
                          <span className="text-yellow-600 flex items-center gap-2"><Clock size={16} /> Trial</span>
                        )}
                      </td>

                      <td className="p-3">{r.revenue}</td>

                      <td className="p-3">
                        <button
                          onClick={() => toggleRestaurantStatus(r.id)}
                          className="px-3 py-1 rounded bg-blue-600 text-white"
                        >
                          Toggle Status
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* 
        SUBSCRIPTIONS TAB
        */}
        {activeTab === "subscriptions" && (
          <>
            <h1 className="text-3xl font-bold mb-6">Subscription Plans</h1>

            <div className="grid grid-cols-3 gap-6">
              {plans.map(plan => (
                <div key={plan.name} className="bg-white rounded-xl shadow p-6">
                  <h2 className="text-2xl font-bold">{plan.name}</h2>
                  <p className="text-xl text-blue-600 font-semibold">{plan.price}</p>

                  <ul className="mt-4 text-gray-700 space-y-2">
                    {plan.features.map(f => <li key={f}>• {f}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </>
        )}

        {/* 
        SUPPORT TICKETS TAB
         */}
        {activeTab === "tickets" && (
          <>
            <h1 className="text-3xl font-bold mb-6">Support Tickets</h1>

            <div className="space-y-4">
              {supportTickets.map(t => (
                <div key={t.id} className="bg-white rounded-xl p-4 shadow flex justify-between">
                  <div>
                    <h3 className="font-bold">{t.issue}</h3>
                    <p className="text-gray-600">{t.restaurant}</p>
                    <p className="text-gray-400 text-sm">{t.time}</p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-lg ${t.status === "open"
                      ? "bg-red-100 text-red-600"
                      : t.status === "in-progress"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                      }`}
                  >
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

      </main>
    </div>
  );
}
