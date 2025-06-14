"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import Contact from "./Contact";
import { useMediaQuery } from "../hooks/use-media-query";

export default function Footer() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <footer className="relative overflow-hidden bg-background border-t-4 border-gray-100">
      {/* Animated background left */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -inset-[100px] opacity-30">
          {/* Animated circles */}
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-primary/20 rounded-full animate-blob"></div>
          <div className="absolute top-3/4 left-2/3 w-[250px] h-[250px] bg-secondary/20 rounded-full animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-accent/20 rounded-full animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Footer content */}
      <div className="container relative z-10 px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>grupobothi2019@gmail.com</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+52 (772) 151 4184</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Carretera Tasquillo-Ixmiquilpan Panales, 42326 Ixmiquilpan, Hgo.</span>
              </li>
            </ul>
            <Contact className={"gap-2"} />
          </div>
        </div>

        <div className="pt-8 mt-8 border-t">
          <p className="text-sm text-center text-muted-foreground">
            © {new Date().getFullYear()} Grupo Bothi. Todos los derechos reservados.
          </p>
        </div>
      </div>

      {/* Animated background right */}
      {!isMobile ? (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -inset-[100px] opacity-30">
            {/* Animated circles */}
            <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-primary/20 rounded-full animate-blob"></div>
            <div className="absolute top-3/4 right-2/3 w-[250px] h-[250px] bg-secondary/20 rounded-full animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-accent/20 rounded-full animate-blob animation-delay-4000"></div>
          </div>
        </div>
      ) : null}
    </footer>
  );
}
