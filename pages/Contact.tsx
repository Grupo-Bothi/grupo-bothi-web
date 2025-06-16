"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Phone } from "lucide-react";
import { useMediaQuery } from "../hooks/use-media-query";
import { useForm } from "react-hook-form";
import { useToast } from "../hooks/use-toast";

interface ContactProps {
  className?: string;
}

type FormInput = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export default function Contact({ className }: ContactProps) {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { register, handleSubmit, reset } = useForm<FormInput>();
  const { toast } = useToast();

  async function onSubmit(formData: FormInput) {
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error?.message ?? undefined);
      }

      if (result.success) {
        toast({
          title: "¡Mensaje enviado!",
          description: "Gracias por contactarnos. Te responderemos pronto.",
          variant: "default",
        });
        reset();
        setOpen(false);
      }
    } catch (error) {
      toast({
        title: "Error al enviar mensaje",
        description:
          error instanceof Error
            ? error.message
            : "Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  }

  const ContactForm = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            required
            placeholder="Nombre"
            {...register("name")}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            placeholder="Email"
            {...register("email")}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Télefono</Label>
          <Input
            id="Télefono"
            type="tel"
            required
            placeholder="Télefono"
            {...register("phone")}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="message">Mensaje</Label>
          <Textarea
            id="message"
            placeholder="¿Cómo podemos ayudarte?"
            className="min-h-[120px]"
            required
            {...register("message")}
          />
        </div>
        <Button type="submit" className="w-full">
          Enviar Mensaje
        </Button>
      </div>
    </form>
  );

  return (
    <>
      {/* Contact button with modal/drawer */}
      {isMobile ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button size="lg" className={className}>
              <Phone className="h-4 w-4" />
              Contáctanos
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Ponte en contacto</DrawerTitle>
              <DrawerDescription>
                Rellene el siguiente formulario y nos pondremos en contacto con
                usted lo antes posible.
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-4 pb-4">
              <ContactForm />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className={className}>
              <Phone className="h-4 w-4" />
              Contáctanos
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Ponte en contacto</DialogTitle>
              <DialogDescription>
                Rellene el siguiente formulario y nos pondremos en contacto con
                usted lo antes posible.
              </DialogDescription>
            </DialogHeader>
            <ContactForm />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
