// components/VerificationEmail.tsx

import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Section,
  Text,
  Button,
} from '@react-email/components';


interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Arial"
          webFont={{
            url: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap',
            format: 'woff2',
          }}
        />
      </Head>

      <Preview>Verify your email with the OTP code</Preview>

      <Section style={{ backgroundColor: '#f5f5f5', padding: '40px 0' }}>
        <Section style={{ maxWidth: '600px', margin: 'auto', backgroundColor: '#fff', borderRadius: '8px', padding: '40px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          
          <Heading as="h1" style={{ fontSize: '24px', marginBottom: '20px' }}>
            Hi {username}, 👋
          </Heading>

          <Text style={{ fontSize: '16px', marginBottom: '20px' }}>
            Thank you for signing up. Please use the following OTP code to verify your email address:
          </Text>

          <Text style={{ fontSize: '32px', fontWeight: 'bold', color: '#2b2b2b', marginBottom: '30px' }}>
            {otp}
          </Text>

          <Button
            href="#"
            style={{
              backgroundColor: '#4f46e5',
              color: '#ffffff',
              padding: '12px 24px',
              fontSize: '16px',
              borderRadius: '6px',
              textDecoration: 'none',
            }}
          >
            Verify Now
          </Button>

          <Text style={{ fontSize: '14px', marginTop: '30px', color: '#666' }}>
            If you didn&#39;t request this, you can safely ignore this email.
          </Text>
        </Section>
      </Section>
    </Html>
  );
}
