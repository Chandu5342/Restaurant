import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LayoutDashboard,
  ShoppingBag,
  UtensilsCrossed,
  Users,
  BarChart3,
  Settings,
  Bell,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  ChefHat,
  DollarSign,
  ArrowUpRight,
  Star,
  Menu,
  Home
} from "lucide-react";

// Placeholder images
const pizzaImg = "https://via.placeholder.com/128?text=Pizza";
const burgerImg = "https://via.placeholder.com/128?text=Burger";
const pastaImg = "https://via.placeholder.com/128?text=Pasta";
const saladImg = "https://via.placeholder.com/128?text=Salad";

// Mock data
const mockOrders = [
  { id: "MF001", table: "Table 5", items: ["Margherita Pizza", "Caesar Salad"], total: 478, status: "pending", time: "2 min ago" },
  { id: "MF002", table: "Table 3", items: ["Chicken Burger x2", "Pasta Alfredo"], total: 647, status: "preparing", time: "8 min ago" },
  { id: "MF003", table: "Table 8", items: ["Grilled Salmon"], total: 449, status: "ready", time: "15 min ago" },
  { id: "MF004", table: "Table 1", items: ["Veggie Wrap", "Caesar Salad"], total: 338, status: "completed", time: "25 min ago" },
];

const menuItems = [
  { id: 1, name: "Margherita Pizza", category: "Pizza", price: 299, status: "active", image: pizzaImg },
  { id: 2, name: "Chicken Burger", category: "Burgers", price: 199, status: "active", image: burgerImg },
  { id: 3, name: "Pasta Alfredo", category: "Pasta", price: 249, status: "active", image: pastaImg },
  { id: 4, name: "Caesar Salad", category: "Salads", price: 179, status: "inactive", image: saladImg },
];

const feedbackItems = [
  { id: 1, customer: "John D.", rating: 5, comment: "Amazing food and quick service!", date: "Today" },
  { id: 2, customer: "Sarah M.", rating: 4, comment: "Good pizza, slightly cold though", date: "Yesterday" },
  { id: 3, customer: "Mike R.", rating: 5, comment: "Best burger in town!", date: "2 days ago" },
];

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [orders, setOrders] = useState(mockOrders);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "orders", label: "Orders", icon: ShoppingBag, badge: orders.filter(o => o.status === "pending").length },
    { id: "menu", label: "Menu", icon: UtensilsCrossed },
    { id: "tables", label: "Tables", icon: Users },
    { id: "feedback", label: "Feedback", icon: Star },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const stats = [
    { label: "Today's Revenue", value: "₹24,560", change: "+12%", trend: "up", icon: DollarSign },
    { label: "Orders", value: "48", change: "+8%", trend: "up", icon: ShoppingBag },
    { label: "Avg Order Value", value: "₹512", change: "-3%", trend: "down", icon: TrendingDown },
    { label: "Active Tables", value: "12/20", change: "", trend: "neutral", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-background flex">

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transition-transform duration-200 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>

        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">M</span>
            </div>
            <div>
              <h1 className="font-bold">MenuFlow</h1>
              <p className="text-xs text-muted-foreground">Restaurant Admin</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors 
              ${activeTab === item.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>

              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>

              {item.badge ? (
                <span className="ml-auto text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              ) : null}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button variant="outline" className="w-full" asChild>
            <Link to="/">
              <Home className="w-4 h-4 mr-2" /> Back to Home
            </Link>
          </Button>
        </div>

      </aside>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-foreground/20 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 lg:ml-64">

        <header className="sticky top-0 bg-background/95 backdrop-blur-sm border-b p-4 flex items-center justify-between">

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>
            <h2 className="font-semibold capitalize text-lg">{activeTab}</h2>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            </Button>

            <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
              <span className="font-semibold">UK</span>
            </div>
          </div>

        </header>

        {/* Dashboard content */}
        <div className="p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <Card key={index} className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>

                        {stat.change && (
                          <p className={`text-sm flex items-center gap-1 mt-1
                            ${stat.trend === "up" ? "text-green-600" :
                              stat.trend === "down" ? "text-red-600" : ""}`}>
                            {stat.trend === "up" ? <TrendingUp /> : <TrendingDown />}
                            {stat.change}
                          </p>
                        )}
                      </div>

                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <stat.icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Orders</CardTitle>

                  <Button variant="ghost" size="sm" onClick={() => setActiveTab("orders")}>
                    View All <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </CardHeader>

                <CardContent>
                  {orders.slice(0, 3).map(order => (
                    <div key={order.id} className="p-4 bg-secondary/50 rounded-xl flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4">

                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                          ${order.status === "pending" ? "bg-yellow-200 text-yellow-800" :
                            order.status === "preparing" ? "bg-blue-200 text-blue-800" :
                              "bg-green-200 text-green-800"}`}>

                          {order.status === "pending" ? <Clock /> :
                            order.status === "preparing" ? <ChefHat /> :
                              <CheckCircle />}
                        </div>

                        <div>
                          <p className="font-semibold">{order.id} • {order.table}</p>
                          <p className="text-sm text-muted-foreground">{order.items.join(", ")}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold">₹{order.total}</p>
                        <p className="text-xs text-muted-foreground">{order.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

            </div>
          )}
        </div>

      </main>
    </div>
  );
}
