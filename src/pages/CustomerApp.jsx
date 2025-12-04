import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  QrCode,
  ArrowRight,
  ShoppingCart,
  Minus,
  Plus,
  MapPin,
  Clock,
  CreditCard,
  Smartphone,
  Banknote,
  Check,
  ChevronLeft,
  Utensils
} from "lucide-react";
// Placeholder images (avoid missing asset imports during conversion)
const foodSpread = "https://via.placeholder.com/800x400?text=Food+Spread";
const pizzaImg = "https://via.placeholder.com/256?text=Pizza";
const burgerImg = "https://via.placeholder.com/256?text=Burger";
const pastaImg = "https://via.placeholder.com/256?text=Pasta";
const saladImg = "https://via.placeholder.com/256?text=Salad";
const salmonImg = "https://via.placeholder.com/256?text=Salmon";
const wrapImg = "https://via.placeholder.com/256?text=Wrap";
const menuItems = [
  { id: 1, name: "Margherita Pizza", description: "Fresh tomatoes, mozzarella, basil", price: 299, image: pizzaImg, category: "Pizza", isVeg: true, rating: 4.8 },
  { id: 2, name: "Chicken Burger", description: "Grilled chicken, lettuce, special sauce", price: 199, image: burgerImg, category: "Burgers", isVeg: false, rating: 4.6 },
  { id: 3, name: "Pasta Alfredo", description: "Creamy white sauce, parmesan", price: 249, image: pastaImg, category: "Pasta", isVeg: true, rating: 4.7 },
  { id: 4, name: "Caesar Salad", description: "Romaine, croutons, caesar dressing", price: 179, image: saladImg, category: "Salads", isVeg: true, rating: 4.5 },
  { id: 5, name: "Grilled Salmon", description: "Atlantic salmon, herbs, lemon butter", price: 449, image: salmonImg, category: "Seafood", isVeg: false, rating: 4.9 },
  { id: 6, name: "Veggie Wrap", description: "Mixed vegetables, hummus, spinach", price: 159, image: wrapImg, category: "Wraps", isVeg: true, rating: 4.4 },
];

const categories = ["All", "Pizza", "Burgers", "Pasta", "Salads", "Seafood", "Wraps"];

export default function CustomerApp() {
  const [screen, setScreen] = useState("qr");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const [cart, setCart] = useState([]);
  const [orderType, setOrderType] = useState("dine-in");
  const [paymentMethod, setPaymentMethod] = useState("upi");

  const filteredItems = selectedCategory === "All"
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = i.quantity + delta;
        return newQty > 0 ? { ...i, quantity: newQty } : i;
      }
      return i;
    }).filter(i => i.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // QR Scan Screen
  if (screen === "qr") {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-24 h-24 rounded-3xl gradient-hero flex items-center justify-center mb-8 animate-pulse-soft">
            <QrCode className="w-12 h-12 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Scan QR Code</h1>
          <p className="text-muted-foreground mb-8">Point your camera at the QR code on your table</p>

          <div className="w-64 h-64 border-4 border-dashed border-primary/30 rounded-3xl flex items-center justify-center mb-8">
            <div className="w-48 h-48 bg-secondary rounded-2xl flex items-center justify-center">
              <QrCode className="w-24 h-24 text-muted-foreground/50" />
            </div>
          </div>

          <Button variant="hero" size="lg" onClick={() => setScreen("menu")}>
            Scan to Continue
            <ArrowRight className="w-5 h-5" />
          </Button>

          <Button variant="link" className="mt-4" asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Order Success Screen
  if (screen === "success") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 text-center">
        <div className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center mb-6 animate-scale-in">
          <Check className="w-12 h-12 text-success" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Order Placed!</h1>
        <p className="text-muted-foreground mb-2">Order #MF2024001</p>
        <p className="text-sm text-muted-foreground mb-8">Your order is being prepared</p>

        <Card variant="elevated" className="w-full max-w-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-muted-foreground">Estimated Time</span>
            <span className="font-semibold flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              15-20 mins
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Table</span>
            <span className="font-semibold">Table 5</span>
          </div>
        </Card>

        <Button variant="hero" size="lg" onClick={() => setScreen("tracking")}>
          Track Order
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    );
  }

  // Order Tracking Screen
  if (screen === "tracking") {
    const steps = [
      { label: "Order Placed", completed: true },
      { label: "Preparing", active: true },
      { label: "Ready", completed: false },
      { label: "Served", completed: false },
    ];

    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border p-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setScreen("menu")}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-semibold">Order #MF2024001</h1>
              <p className="text-sm text-muted-foreground">Track your order</p>
            </div>
          </div>
        </header>

        <div className="p-6">
          <Card variant="elevated" className="p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center">
                  <Utensils className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold">Preparing your order</p>
                  <p className="text-sm text-muted-foreground">Est. 12 mins remaining</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step.completed ? 'bg-success text-success-foreground' :
                    step.active ? 'bg-primary text-primary-foreground animate-pulse' :
                      'bg-secondary text-muted-foreground'
                    }`}>
                    {step.completed ? <Check className="w-4 h-4" /> : index + 1}
                  </div>
                  <span className={step.completed || step.active ? 'font-medium' : 'text-muted-foreground'}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <h3 className="font-semibold mb-4">Order Summary</h3>
          {cart.map(item => (
            <div key={item.id} className="flex items-center justify-between py-3 border-b border-border">
              <div className="flex items-center gap-3">
                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">x{item.quantity}</p>
                </div>
              </div>
              <span className="font-semibold">₹{item.price * item.quantity}</span>
            </div>
          ))}

          <div className="flex items-center justify-between py-4 font-bold text-lg">
            <span>Total</span>
            <span>₹{cartTotal}</span>
          </div>
        </div>
      </div>
    );
  }

  // Checkout Screen
  if (screen === "checkout") {
    return (
      <div className="min-h-screen bg-background pb-24">
        <header className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border p-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setScreen("cart")}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-semibold text-lg">Checkout</h1>
          </div>
        </header>

        <div className="p-4 space-y-6">
          {/* Order Type */}
          <div>
            <h3 className="font-semibold mb-3">Order Type</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "dine-in", label: "Dine In", icon: Utensils },
                { value: "takeaway", label: "Takeaway", icon: ShoppingCart }
              ].map(type => (
                <Card
                  key={type.value}
                  variant={orderType === type.value ? "portal" : "default"}
                  className={`p-4 cursor-pointer ${orderType === type.value ? 'border-primary' : ''}`}
                  onClick={() => setOrderType(type.value)}
                >
                  <div className="flex items-center gap-3">
                    <type.icon className={`w-5 h-5 ${orderType === type.value ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className={orderType === type.value ? 'font-semibold' : ''}>{type.label}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="font-semibold mb-3">Payment Method</h3>
            <div className="space-y-3">
              {[
                { value: "upi", label: "UPI", desc: "Google Pay, PhonePe, Paytm" },
                { value: "card", label: "Card", desc: "Credit/Debit Card" },
                { value: "cash", label: "Cash", desc: "Pay at counter" },
              ].map(method => (
                <Card
                  key={method.value}
                  variant={paymentMethod === method.value ? "portal" : "default"}
                  className={`p-4 cursor-pointer ${paymentMethod === method.value ? 'border-primary' : ''}`}
                  onClick={() => setPaymentMethod(method.value)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${paymentMethod === method.value ? 'bg-primary/10' : 'bg-secondary'
                      }`}>
                      <method.icon className={`w-5 h-5 ${paymentMethod === method.value ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <div className="flex-1">
                      <p className={paymentMethod === method.value ? 'font-semibold' : ''}>{method.label}</p>
                      <p className="text-sm text-muted-foreground">{method.desc}</p>
                    </div>
                    {paymentMethod === method.value && (
                      <Check className="w-5 h-5 text-primary" />
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <h3 className="font-semibold mb-3">Order Summary</h3>
            <Card variant="elevated" className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Taxes</span>
                  <span>₹{Math.round(cartTotal * 0.05)}</span>
                </div>
                <div className="border-t border-border pt-2 mt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{cartTotal + Math.round(cartTotal * 0.05)}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
          <Button
            variant="hero"
            size="lg"
            className="w-full"
            onClick={() => setScreen("success")}
          >
            Place Order • ₹{cartTotal + Math.round(cartTotal * 0.05)}
          </Button>
        </div>
      </div>
    );
  }

  // Cart Screen
  if (screen === "cart") {
    return (
      <div className="min-h-screen bg-background pb-24">
        <header className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border p-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setScreen("menu")}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-semibold text-lg">Your Cart ({cartCount})</h1>
          </div>
        </header>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <ShoppingCart className="w-16 h-16 text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">Your cart is empty</p>
            <Button variant="hero" className="mt-6" onClick={() => setScreen("menu")}>
              Browse Menu
            </Button>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {cart.map(item => (
              <Card key={item.id} variant="default" className="p-4">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-primary font-semibold">₹{item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-muted-foreground">Total</span>
              <span className="font-bold text-xl">₹{cartTotal}</span>
            </div>
            <Button
              variant="hero"
              size="lg"
              className="w-full"
              onClick={() => setScreen("checkout")}
            >
              Proceed to Checkout
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    );
  }

  // Item Detail Screen
  if (screen === "item" && selectedItem) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <header className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border p-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => { setScreen("menu"); setSelectedItem(null); }}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-semibold text-lg">Item Details</h1>
          </div>
        </header>

        <div className="p-4">
          <div className="flex justify-center mb-6">
            <img src={selectedItem.image} alt={selectedItem.name} className="w-48 h-48 rounded-2xl object-cover shadow-lg" />
          </div>

          <div className="mb-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-3 h-3 rounded-full ${selectedItem.isVeg ? 'bg-success' : 'bg-destructive'}`} />
                  <span className="text-xs text-muted-foreground">{selectedItem.isVeg ? 'Veg' : 'Non-veg'}</span>
                </div>
                <h2 className="text-2xl font-bold">{selectedItem.name}</h2>
              </div>
              <span className="text-2xl font-bold text-primary">₹{selectedItem.price}</span>
            </div>
            <p className="text-muted-foreground">{selectedItem.description}</p>
          </div>

          <Card variant="elevated" className="p-4">
            <h3 className="font-semibold mb-3">Customize</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span>Extra Cheese (+₹30)</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span>Extra Sauce (+₹15)</span>
              </label>
            </div>
          </Card>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
          <Button
            variant="hero"
            size="lg"
            className="w-full"
            onClick={() => { addToCart(selectedItem); setScreen("menu"); setSelectedItem(null); }}
          >
            Add to Cart • ₹{selectedItem.price}
          </Button>
        </div>
      </div>
    );
  }

  // Menu Screen (default)
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border p-4 z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="font-bold text-xl">The Urban Kitchen</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              Table 5 • Dine In
            </div>
          </div>
          <Button variant="ghost" size="icon" className="relative" onClick={() => setScreen("cart")}>
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
          {categories.map(cat => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "secondary"}
              size="sm"
              className="flex-shrink-0"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </header>

      {/* Menu Items */}
      <div className="p-4 space-y-4">
        {filteredItems.map(item => (
          <Card
            key={item.id}
            variant="interactive"
            className="p-4"
            onClick={() => { setSelectedItem(item); setScreen("item"); }}
          >
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-3 h-3 rounded-full ${item.isVeg ? 'bg-success' : 'bg-destructive'}`} />
                  <span className="text-xs text-muted-foreground">{item.category}</span>
                </div>
                <h3 className="font-semibold mb-1">{item.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                <span className="font-bold text-primary">₹{item.price}</span>
              </div>
              <div className="relative flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-24 h-24 rounded-xl object-cover" />
                <Button
                  variant="hero"
                  size="sm"
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2"
                  onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Bottom Cart Bar */}
      {cartCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
          <Button
            variant="hero"
            size="lg"
            className="w-full"
            onClick={() => setScreen("cart")}
          >
            <ShoppingCart className="w-5 h-5" />
            View Cart ({cartCount}) • ₹{cartTotal}
          </Button>
        </div>
      )}
    </div>
  );
}

