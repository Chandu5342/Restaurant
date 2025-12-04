import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import {
  QrCode,
  Clock,
  CreditCard,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Smartphone,
  Store,
  Shield,
  Star,
} from "lucide-react";
// If the original asset isn't present, use an external placeholder to avoid build errors
const heroBurger = "https://via.placeholder.com/800x600?text=Hero+Image";

const features = [
  {
    icon: QrCode,
    title: "QR Digital Menu",
    description: "Contactless ordering with beautiful digital menus",
  },
  {
    icon: Clock,
    title: "Real-time Orders",
    description: "Live order tracking and kitchen management",
  },
  {
    icon: CreditCard,
    title: "Multi-payment",
    description: "UPI, cards, wallets, and cash supported",
  },
  {
    icon: BarChart3,
    title: "Smart Analytics",
    description: "Insights on sales, trends, and customer behavior",
  },
];

const portals = [
  {
    title: "Customer App",
    description: "Scan, browse, order, and pay - all from your phone",
    features: ["QR Scan & Menu", "Easy Checkout", "Order Tracking"],
    icon: Smartphone,
    link: "/customer",
    color: "from-orange-500 to-amber-500",
  },
  {
    title: "Restaurant Admin",
    description: "Complete control over your restaurant operations",
    features: ["Order Management", "Menu Control", "Analytics"],
    icon: Store,
    link: "/admin",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Super Admin",
    description: "Manage all restaurants from one powerful dashboard",
    features: ["Multi-Restaurant", "Subscriptions", "Platform Analytics"],
    icon: Shield,
    link: "/super-admin",
    color: "from-purple-500 to-pink-500",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="landing" />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Star className="w-4 h-4" />
                #1 Restaurant Management Platform
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Serve Smarter with <span className="text-gradient">Digital Menus</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Transform your restaurant with QR-powered ordering, real-time kitchen management, and powerful analytics. All in one beautiful platform.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/customer">
                    Try Demo
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="hero-outline" size="lg" asChild>
                  <Link to="/admin">Restaurant Login</Link>
                </Button>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  Free 14-day trial
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  No credit card required
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative animate-fade-in">
              <div className="relative rounded-2xl overflow-hidden shadow-elevated">
                <img src={heroBurger} alt="Delicious gourmet burger" className="w-full h-auto object-cover" />

                {/* Floating Stats Card */}
                <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-xl p-4 shadow-card animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-hero flex items-center justify-center">
                      <Store className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-bold text-xl">2,500+</p>
                      <p className="text-sm text-muted-foreground">Active Restaurants</p>
                    </div>
                  </div>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-card/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-card flex items-center gap-2">
                  <Star className="w-4 h-4 text-warning fill-warning" />
                  <span className="font-semibold">4.9</span>
                  <span className="text-sm text-muted-foreground">(12k reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card text-foreground text-sm font-medium mb-4 shadow-soft">Features</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to run a modern restaurant</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">From digital menus to analytics, we've got you covered</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} variant="feature" className="p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portals Section */}
      <section id="portals" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-foreground text-sm font-medium mb-4">Portals</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Three powerful interfaces</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Purpose-built experiences for customers, restaurants, and platform admins</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {portals.map((portal, index) => (
              <Card key={index} variant="portal" className="p-6 group">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${portal.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <portal.icon className="w-7 h-7 text-primary-foreground" />
                </div>

                <h3 className="font-bold text-xl mb-2">{portal.title}</h3>
                <p className="text-muted-foreground text-sm mb-6">{portal.description}</p>

                <ul className="space-y-2 mb-6">
                  {portal.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-success" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button variant="outline" className="w-full group-hover:border-primary/30" asChild>
                  <Link to={portal.link}>
                    Explore
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <Card variant="elevated" className="p-8 md:p-12 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to transform your restaurant?</h2>
            <p className="text-muted-foreground mb-8">Join thousands of restaurants already using MenuFlow to serve smarter</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/customer">View Demo</Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <Link to="/admin">Start Free Trial</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
                <span className="text-primary-foreground font-bold">M</span>
              </div>
              <span className="font-semibold">MenuFlow Pro</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 MenuFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

