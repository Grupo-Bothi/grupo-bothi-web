"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, MessageCirclePlus, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Contact from "./Contact";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Equipo", href: "#equipo" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#1a337d]/95 backdrop-blur-md shadow-lg py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.jpg"
            alt="Grupo Bothi"
            width={42}
            height={42}
            className="rounded-full ring-2 ring-white/30"
          />
          <span className="text-white font-bold text-lg hidden sm:block tracking-tight">
            Grupo Bothi
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/85 hover:text-white font-medium text-sm transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:transition-all hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <Link
              href="https://wa.me/7721514184"
              className="w-8 h-8 flex items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all"
            >
              <MessageCirclePlus className="h-4 w-4" />
            </Link>
            <Link
              href="https://www.facebook.com/profile.php?id=61558527724816"
              className="w-8 h-8 flex items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all"
            >
              <Facebook className="h-4 w-4" />
            </Link>
            <Link
              href="https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.instagram.com%2Fgrupobothioficial%3Ffbclid%3DIwZXh0bgNhZW0CMTAAAR1SmWz7_TJMRbsdc78t71Vhi73g2zueNah2Cn4TTkHa44dBz3jYoPbzvNI_aem_I0t8gy2lLswvFAsQpYKzsw&h=AT3VwXY0ZDGDFIQdkjliRQCwZPhUTrJDb24dj0JZNaHYXEzcilNAecqew2WO1mujNicmopTg_sqkx-JH9h3wznulB3d9MrPI_KCgzpiMaOE-O4qaZhCPRdUC8IrGa8Y4JESiP7fRGpFEu6qmiAcea82Ilg"
              className="w-8 h-8 flex items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all"
            >
              <Instagram className="h-4 w-4" />
            </Link>
          </div>

          <div className="hidden md:block">
            <Contact className="bg-white text-[#2547a0] hover:bg-white/90 rounded-full px-5 h-9 text-sm font-semibold shadow-md" />
          </div>

          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:bg-white/10 h-9 w-9"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-[#1e3a8a] text-white border-none w-72"
            >
              <div className="flex items-center gap-3 mb-10 mt-2">
                <Image
                  src="/logo.jpg"
                  alt="Logo"
                  width={36}
                  height={36}
                  className="rounded-full"
                />
                <span className="font-bold text-white">Grupo Bothi</span>
              </div>
              <nav className="flex flex-col gap-5">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-white/85 hover:text-white text-xl font-medium transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="mt-8 flex flex-col gap-3">
                <Contact className="w-full rounded-full" />
                <div className="flex justify-center gap-4 mt-2">
                  <Link href="https://wa.me/7721514184" className="text-white/70 hover:text-white">
                    <MessageCirclePlus className="h-5 w-5" />
                  </Link>
                  <Link href="https://www.facebook.com/profile.php?id=61558527724816" className="text-white/70 hover:text-white">
                    <Facebook className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.instagram.com%2Fgrupobothioficial%3Ffbclid%3DIwZXh0bgNhZW0CMTAAAR1SmWz7_TJMRbsdc78t71Vhi73g2zueNah2Cn4TTkHa44dBz3jYoPbzvNI_aem_I0t8gy2lLswvFAsQpYKzsw&h=AT3VwXY0ZDGDFIQdkjliRQCwZPhUTrJDb24dj0JZNaHYXEzcilNAecqew2WO1mujNicmopTg_sqkx-JH9h3wznulB3d9MrPI_KCgzpiMaOE-O4qaZhCPRdUC8IrGa8Y4JESiP7fRGpFEu6qmiAcea82Ilg"
                    className="text-white/70 hover:text-white"
                  >
                    <Instagram className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
