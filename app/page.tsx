import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChefHat,
  ConciergeBell,
  Hotel,
  Layers,
  QrCode,
  ShieldCheck,
  Sparkles,
  Zap
} from "lucide-react";

import { Navbar } from "@/components/navbar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "QR-First Experience",
    description: "Guests scan a room-specific QR code to open a beautifully optimized ordering suite. No apps, no friction.",
    icon: QrCode,
    color: "text-blue-400"
  },
  {
    title: "Realtime Operations",
    description: "Kitchen and Valet teams receive requests instantly. Realtime updates keep guests informed at every step.",
    icon: Zap,
    color: "text-amber-400"
  },
  {
    title: "Staff Orchestration",
    description: "Dedicated dashboards for separate fulfillment streams. Move requests from pending to delivered with ease.",
    icon: Layers,
    color: "text-emerald-400"
  },
  {
    title: "Manager Insights",
    description: "Track performance, hot items, and room activity in a unified analytics-style manager dashboard.",
    icon: BarChart3,
    color: "text-purple-400"
  }
];

const dashboardPreviews = [
  {
    title: "Guest Room UI",
    description: "A premium mobile-first dining and service menu.",
    href: "/room/101",
    badge: "Guest UX",
    icon: Sparkles
  },
  {
    title: "Kitchen Ops",
    description: "Live food queue for rapid preparation and flow.",
    href: "/kitchen",
    badge: "Food Team",
    icon: ChefHat
  },
  {
    title: "Valet & Service",
    description: "Coordinate housekeeping and service fulfillment.",
    href: "/valet",
    badge: "Service Team",
    icon: ConciergeBell
  },
  {
    title: "Executive View",
    description: "Analytics and control for the management layer.",
    href: "/manager",
    badge: "Analytics",
    icon: BarChart3
  }
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden selection:bg-primary/30 selection:text-white">
      <Navbar />
      
      {/* Background Decor */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[1000px] w-full -translate-x-1/2 overflow-hidden opacity-30">
        <div className="absolute left-[10%] top-[10%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute right-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      <section className="grid-overlay pt-24 pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="animate-in fade-in slide-in-from-top-4 duration-1000 inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.4em] text-primary backdrop-blur-md">
              <Sparkles className="h-4 w-4" />
              The Future of Hospitality
            </div>
            
            <div className="mt-12 max-w-4xl">
              <h1 className="animate-in fade-in slide-in-from-bottom-8 duration-1000 font-display text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-7xl lg:text-9xl">
                Hospitality, <br />
                <span className="text-gradient">Redefined.</span>
              </h1>
              <p className="animate-in fade-in slide-in-from-bottom-12 duration-1000 mt-10 mx-auto max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl md:text-2xl">
                RoomSwift is a premium QR-driven platform for smart hotels and modern restaurants. 
                Streamline orders, automate service requests, and empower your team with 
                realtime operational dashboards.
              </p>
              
              <div className="animate-in fade-in slide-in-from-bottom-16 duration-1000 mt-12 flex flex-col sm:flex-row justify-center gap-6">
                <Link href="/room/101" className={cn(buttonVariants({ variant: "primary", size: "lg" }), "button-glow group h-14 px-10 rounded-2xl text-lg")}>
                  Try Guest Demo
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href="/manager" className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "group h-14 px-10 rounded-2xl text-lg")}>
                  Manager View
                  <BarChart3 className="ml-2 h-5 w-5 opacity-70" />
                </Link>
              </div>

              <div className="animate-in fade-in slide-in-from-bottom-20 duration-1000 mt-16 flex flex-wrap justify-center items-center gap-8 text-slate-500">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest">Production Grade</span>
                </div>
                <div className="hidden sm:block h-6 w-[1px] bg-white/10" />
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                    <Zap className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest">Realtime Sync</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">Built for Scale</h2>
            <p className="mt-4 text-slate-400">Everything you need to run a high-performance dining or hotel operation.</p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} className="glass-panel group relative overflow-hidden rounded-[2.5rem] p-8 transition-all hover:-translate-y-1 hover:border-primary/50">
                <div className={cn("inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 transition-transform group-hover:scale-110", feature.color)}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-white">{feature.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-400">{feature.description}</p>
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/5 blur-2xl transition-opacity group-hover:opacity-100" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* App Previews */}
      <section className="bg-white/2 py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-16 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl text-center lg:text-left">
              <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Live Operations</span>
              <h2 className="mt-4 font-display text-5xl font-bold leading-tight text-white lg:text-6xl">
                One platform, <br />
                <span className="text-slate-500">multiple perspectives.</span>
              </h2>
            </div>
            
            <div className="flex justify-center">
              <div className="rounded-2xl border border-white/5 bg-slate-900/50 p-2 backdrop-blur-md">
                <p className="px-4 py-2 text-xs font-semibold text-slate-500">V.1.0 Ready for Deployment</p>
              </div>
            </div>
          </div>

          <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {dashboardPreviews.map((preview) => (
              <Link key={preview.title} href={preview.href} className="group">
                <Card className="glass-panel flex flex-col items-center gap-6 rounded-[2.5rem] p-8 text-center transition hover:border-primary/30">
                  <div className="flex h-16 w-16 items-center justify-center rounded-[2rem] bg-slate-950/50 shadow-inner group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <preview.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <div className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                      {preview.badge}
                    </div>
                    <h3 className="text-xl font-bold text-white">{preview.title}</h3>
                    <p className="mt-2 text-sm text-slate-500">{preview.description}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="w-full rounded-2xl bg-white/5 hover:bg-primary hover:text-primary-foreground">
                    Launch Demo
                  </Button>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-20 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-6">
              <Zap className="h-4 w-4" />
              Scalable Growth
            </div>
            <h2 className="font-display text-5xl font-bold text-white sm:text-6xl">
              Transparent Pricing
            </h2>
            <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
              Choose the perfect plan for your establishment. Whether you're a boutique cafe or a luxury hotel chain, we have you covered.
            </p>
          </div>

          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Essential",
                price: "49",
                description: "Perfect for single-property boutique hotels and restaurants looking to simplify guest requests.",
                features: [
                  "QR-Driven Guest Suite",
                  "Real-time Food Queue",
                  "Basic Analytics",
                  "Standard Support",
                  "Uptime SLA 99.5%"
                ],
                button: "Start Free Trial",
                recommended: false
              },
              {
                name: "Professional",
                price: "99",
                description: "Our most popular plan for high-volume hotels requiring multi-team orchestration.",
                features: [
                  "Everything in Essential",
                  "Advanced Staff Dashboards",
                  "Full Operational Analytics",
                  "Custom Branding",
                  "Priority Email Support"
                ],
                button: "Get Started Now",
                recommended: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "Dedicated infrastructure and support for large-scale hotel groups and resort chains.",
                features: [
                  "Multi-Property Support",
                  "API Access & Webhooks",
                  "24/7 Dedicated Account Manager",
                  "Custom Integration Service",
                  "On-site Training"
                ],
                button: "Contact Sales",
                recommended: false
              }
            ].map((plan) => (
              <Card 
                key={plan.name} 
                className={cn(
                  "glass-panel relative flex flex-col rounded-[3rem] p-8 transition-all hover:border-primary/50 lg:p-12",
                  plan.recommended ? "border-primary/40 ring-1 ring-primary/20 bg-primary/5 shadow-2xl" : "bg-white/2"
                )}
              >
                {plan.recommended && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary-foreground shadow-lg">
                    Recommended
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white tracking-tighter">
                      {plan.price !== "Custom" ? "$" : ""}{plan.price}
                    </span>
                    {plan.price !== "Custom" && <span className="text-slate-500 font-medium">/mo</span>}
                  </div>
                  <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-10 space-y-4">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <CheckCircle2 className="h-3 w-3" />
                      </div>
                      <span className="text-sm text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className={cn(
                    "mt-auto h-14 w-full rounded-2xl font-bold text-lg",
                    plan.recommended ? "button-glow" : "bg-white/5 border-white/5 hover:bg-white/10"
                  )}
                  variant={plan.recommended ? "primary" : "secondary"}
                >
                  {plan.button}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="relative py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="glass-panel relative flex flex-col items-center overflow-hidden rounded-[4rem] px-8 py-24 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-500/10 opacity-50" />
            
            <div className="relative z-10 max-w-3xl">
              <h2 className="font-display text-5xl font-bold leading-none text-white sm:text-6xl">
                Ready to elevate <br /> your guest UX?
              </h2>
              <p className="mt-8 text-lg text-slate-400 sm:text-xl">
                Join the smart hotels and restaurants building the next generation of hospitality experiences with RoomSwift.
              </p>
              <div className="mt-12 flex flex-wrap justify-center gap-6">
                <Link href="/room/101" className={cn(buttonVariants({ variant: "primary", size: "lg" }), "button-glow px-12")}>
                  Start Live Demo
                </Link>
                <Link href="/manager" className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "px-12")}>
                  View Analytics
                </Link>
              </div>
            </div>
            
            <div className="absolute -bottom-1/2 left-0 right-0 h-[300px] bg-primary/20 blur-[100px]" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-slate-950 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2">
            <Hotel className="h-5 w-5 text-primary" />
            <span className="font-display text-xl font-bold text-white tracking-tight">RoomSwift</span>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            © 2026 RoomSwift Smart Hospitality Systems. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
