import Image from "next/image";

export default function NuestroEquipo() {
  const teamMembers = [
    {
      name: "DREW WEBER",
      role: "Fundador",
      image: "/placeholder.svg?height=600&width=450",
    },
    {
      name: "JAYA DIXON",
      role: "Gerente de proyectos",
      image: "/placeholder.svg?height=600&width=450",
    },
    {
      name: "REESE PLATT",
      role: "Contratista general",
      image: "/placeholder.svg?height=600&width=450",
    },
    {
      name: "JAMIE KOKOT",
      role: "Ingeniero de construcción",
      image: "/placeholder.svg?height=600&width=450",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-gray-900">Nuestro</h2>
        <h2 className="text-4xl font-bold text-gray-900">equipo</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col">
            <div className="relative aspect-[3/4] w-full mb-4">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover rounded-[10px]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
            <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
            <p className="text-sm text-gray-600">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
