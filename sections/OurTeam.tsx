"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useInView } from "../hooks/use-in-view";
import { cn } from "@/lib/utils";
import type { TeamMember } from "../src/lib/site-images";

export default function OurTeam({ team = [] }: { team: TeamMember[] }) {
  const { ref, inView } = useInView();

  return (
    <section id="equipo" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          ref={ref}
          className={cn(
            "mb-14 transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100">
            El equipo
          </Badge>
          <h2 className="text-4xl font-black text-gray-900 leading-tight">
            Nuestro <span className="text-[#2547a0]">equipo</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl text-lg">
            Profesionales con años de experiencia listos para atender tu
            proyecto con dedicación y calidad.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team?.map((member, i) => (
            <div
              key={i}
              className={cn(
                "group transition-all duration-700",
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8",
              )}
              style={{ transitionDelay: `${i * 100 + 200}ms` }}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-4 shadow-md">
                <Image
                  src={member.url}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized={member.url.startsWith("http")}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a337d]/85 via-[#2547a0]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white font-bold text-sm">{member.name}</p>
                  <p className="text-blue-200 text-xs">{member.role}</p>
                </div>
              </div>
              <h3 className="font-bold text-gray-900">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
