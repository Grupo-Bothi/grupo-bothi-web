/* eslint-disable react/no-unescaped-entities */
// src/components/EmailMessage.tsx
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

type MessageUserEmailProps = {
  name: string;
  email: string;
  message: string;
};

export default function MessageUserEmail({
  name,
  message,
}: MessageUserEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Gracias por contactar con Grupo Bothi</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="bg-white p-8 rounded-lg shadow-md my-8 mx-auto">
            <Heading className="text-2xl font-bold text-gray-800 mb-2 text-center">
              ¡Gracias por contactarnos!
            </Heading>
            <Text className="text-gray-700">Hola {name},</Text>
            <Text className="text-gray-700">
              Hemos recibido tu mensaje y nos pondremos en contacto contigo lo
              antes posible. Normalmente respondemos en un plazo de 24-48 horas.
            </Text>
            <Section className="bg-gray-50 p-4 rounded-md my-6">
              <Text className="text-gray-700 font-medium">Tu mensaje:</Text>
              <Text className="italic text-gray-600">
                "
                {message.length > 150
                  ? `${message.substring(0, 150)}...`
                  : message}
                "
              </Text>
            </Section>
            <Button
              href="https://www.grupobothi.com"
              className="bg-blue-600 text-white font-medium py-2 px-4 rounded-md text-center block mx-auto"
            >
              Visitar nuestra web
            </Button>

            <Hr className="border-gray-200 my-6" />

            <Text className="text-gray-700">
              Saludos,
              <br />
              El equipo de Grupo Bothi
            </Text>

            <Hr className="border-gray-200 my-6" />

            <Text className="text-xs text-gray-500 text-center">
              © {new Date().getFullYear()} Grupo Bothi. Todos los derechos
              reservados.
            </Text>

            <Text className="text-xs text-gray-500 text-center">
              Este es un email automático, por favor no respondas a este
              mensaje.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
