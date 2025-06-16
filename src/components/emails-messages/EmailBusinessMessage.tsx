import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

type MessageBusinessEmailProps = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const MessageBusinessEmail = ({
  name,
  email,
  phone,
  message,
}: MessageBusinessEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Nuevo mensaje de contacto de {name}</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="bg-white p-8 rounded-lg shadow-md my-8 mx-auto">
            <Heading className="text-2xl font-bold text-gray-800 mb-4">
              Nuevo mensaje de contacto
            </Heading>
            <Hr className="border-gray-200 my-4" />

            <Section className="bg-gray-50 p-4 rounded-md">
              <Row>
                <Column>
                  <Text className="text-gray-700">
                    <strong>Nombre:</strong> {name}
                  </Text>
                </Column>
              </Row>
              <Row>
                <Column>
                  <Text className="text-gray-700">
                    <strong>Email:</strong> {email}
                  </Text>
                </Column>
              </Row>
              <Row>
                <Column>
                  <Text className="text-gray-700">
                    <strong>Télefono:</strong> {phone}
                  </Text>
                </Column>
              </Row>
              <Row>
                <Column>
                  <Text className="text-gray-700 mb-2">
                    <strong>Mensaje:</strong>
                  </Text>
                  <Text className="bg-white p-4 rounded-md border border-gray-200 text-gray-600">
                    {message.split("\n").map((line, i) => (
                      <span key={i}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </Text>
                </Column>
              </Row>
            </Section>
            <Hr className="border-gray-200 my-4" />
            <Text className="text-sm text-gray-500 text-center">
              Este mensaje fue enviado desde el formulario de contacto de Grupo
              Bothi Multiservicios.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default MessageBusinessEmail;
