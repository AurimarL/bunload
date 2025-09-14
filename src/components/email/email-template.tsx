import { Html, Text } from "@react-email/components";

interface EmailTemplateProps {
  firstName: string;
}

export default function EmailTemplate({ firstName }: EmailTemplateProps) {
  return (
    <Html>
      <Text>Welcome, {firstName}!</Text>
    </Html>
  );
}
