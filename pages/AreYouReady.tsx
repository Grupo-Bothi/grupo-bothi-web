import Image from "next/image";
import Contact from "./Contact";

export default function AreYouReady() {
  return (
    <div className="min-h-[60vh] w-full bg-[#2547a0] flex items-center justify-center p-4 md:p-8">
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="rounded-lg overflow-hidden">
            <Image
              src="/areReady1.jpeg?height=600&width=500"
              width={500}
              height={600}
              alt="Electrician working on a building"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="text-white space-y-6 pl-7">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              ¿Estás listo para construir tu visión?
            </h1>
            <p className="text-lg opacity-90">
              Todo empieza con una idea. Tal vez quieras comenzar un negocio o
              convertir un pasatiempo en algo más. O bien, es posible que tengas
              un proyecto creativo para compartir con el mundo.
            </p>

            <Contact className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-8 py-6 rounded-full text-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
