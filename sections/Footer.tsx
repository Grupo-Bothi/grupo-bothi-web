"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Instagram, MessageCirclePlus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Contact from "./Contact";
import MapButton from "./MapPin";

const navLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Equipo", href: "#equipo" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.jpg"
                alt="Grupo Bothi"
                width={44}
                height={44}
                className="rounded-full ring-2 ring-white/20"
              />
              <div>
                <p className="font-bold text-white leading-none">Grupo Bothi</p>
                <p className="text-gray-400 text-xs mt-0.5">MultiServicios</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Expertos en instalaciones eléctricas, climatización, plomería y
              energía solar en Ixmiquilpan, Hidalgo.
            </p>
            <div className="flex gap-2">
              <Link
                href="https://wa.me/7721514184"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <MessageCirclePlus className="h-4 w-4" />
              </Link>
              <Link
                href="https://www.facebook.com/profile.php?id=61558527724816"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                href="https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.instagram.com%2Fgrupobothioficial%3Ffbclid%3DIwZXh0bgNhZW0CMTAAAR1SmWz7_TJMRbsdc78t71Vhi73g2zueNah2Cn4TTkHa44dBz3jYoPbzvNI_aem_I0t8gy2lLswvFAsQpYKzsw&h=AT3VwXY0ZDGDFIQdkjliRQCwZPhUTrJDb24dj0JZNaHYXEzcilNAecqew2WO1mujNicmopTg_sqkx-JH9h3wznulB3d9MrPI_KCgzpiMaOE-O4qaZhCPRdUC8IrGa8Y4JESiP7fRGpFEu6qmiAcea82Ilg"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider">
              Navegación
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className="space-y-4">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider">
              Contáctanos
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-500" />
                <span>grupobothi2019@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="w-4 h-4 flex-shrink-0 text-gray-500" />
                <span>+52 (772) 151 4184</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-500" />
                <span>
                  Carretera Tasquillo-Ixmiquilpan Panales, 42326 Ixmiquilpan,
                  Hgo.
                </span>
              </li>
            </ul>
            <div className="flex gap-2 flex-wrap pt-1">
              <Contact className="gap-2 text-sm rounded-full h-9 px-4" />
              <MapButton className="gap-2 text-sm rounded-full h-9 px-4 border-gray-700 text-gray-300 hover:text-white hover:bg-white/10" />
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-white/10" />

      <div className="container mx-auto px-4 py-5">
        <p className="text-sm text-center text-gray-500">
          © {new Date().getFullYear()} Grupo Bothi. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
