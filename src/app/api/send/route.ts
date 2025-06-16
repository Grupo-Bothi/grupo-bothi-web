/* eslint-disable @typescript-eslint/no-explicit-any */
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import MessageBusinessEmail from "@/components/emails-messages/EmailBusinessMessage";
import MessageUserEmail from "@/components/emails-messages/EmailUserMessage";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = "grupobothi2019@gmail.com";

interface EmailResponse {
  data?: any;
  error?: {
    message: string;
    name?: string;
    statusCode?: number;
  } | null;
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: name, email or message",
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    const [businessEmail, userEmail]: [EmailResponse, EmailResponse] =
      await Promise.all([
        resend.emails.send({
          from: `Grupo Bothi <${fromEmail}>`,
          to: [`${fromEmail}`],
          subject: `Nuevo mensaje de contacto de ${name}`,
          react: MessageBusinessEmail({ name, email, phone, message }),
          replyTo: email,
        }),
        resend.emails.send({
          from: `Grupo Bothi <${fromEmail}>`,
          to: [email],
          subject: `Hemos recibido tu mensaje - ${name}`,
          react: MessageUserEmail({ name, email, message }),
        }),
      ]);

    const hasErrors = businessEmail.error || userEmail.error;

    return NextResponse.json(
      {
        success: !hasErrors,
        data: !hasErrors
          ? {
              businessEmail: businessEmail.data,
              userEmail: userEmail.data,
            }
          : null,
        error: hasErrors
          ? {
              ...(businessEmail.error || {}),
              ...(userEmail.error || {}),
            }
          : undefined,
      },
      {
        status: hasErrors ? 502 : 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error interno del servidor",
        details:
          error instanceof Error
            ? error.message
            : "Ocurrio un error inesperado",
      },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
