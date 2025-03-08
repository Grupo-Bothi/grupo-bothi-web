import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, MessageCirclePlus } from "lucide-react";

export default function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-3"
      style={{ backgroundColor: "#2547a0" }}
    >
      <div className="flex items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.jpg?height=40&width=40"
            alt="Logo"
            width={40}
            height={40}
            className="h-15 w-15 rounded-full"
          />
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link
          href="https://wa.me/7721514184"
          className="text-white hover:text-blue-200 transition-colors"
        >
          <MessageCirclePlus className="h-5 w-5" />
          <span className="sr-only">Whatsapp</span>
        </Link>
        <Link
          href="https://www.facebook.com/profile.php?id=61558527724816"
          className="text-white hover:text-blue-200 transition-colors"
        >
          <Facebook className="h-5 w-5" />
          <span className="sr-only">Facebook</span>
        </Link>
        <Link
          href="https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.instagram.com%2Fgrupobothioficial%3Ffbclid%3DIwZXh0bgNhZW0CMTAAAR1SmWz7_TJMRbsdc78t71Vhi73g2zueNah2Cn4TTkHa44dBz3jYoPbzvNI_aem_I0t8gy2lLswvFAsQpYKzsw&h=AT3VwXY0ZDGDFIQdkjliRQCwZPhUTrJDb24dj0JZNaHYXEzcilNAecqew2WO1mujNicmopTg_sqkx-JH9h3wznulB3d9MrPI_KCgzpiMaOE-O4qaZhCPRdUC8IrGa8Y4JESiP7fRGpFEu6qmiAcea82Ilg"
          className="text-white hover:text-blue-200 transition-colors"
        >
          <Instagram className="h-5 w-5" />
          <span className="sr-only">Instagram</span>
        </Link>
      </div>
    </header>
  );
}
