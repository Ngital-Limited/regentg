/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'

import { brand, main, container, logoWrap, logo, headerBar, h1, text, link, button, divider, footer, footerLink } from './_styles.ts'

interface SignupEmailProps {
  siteName: string
  siteUrl: string
  recipient: string
  confirmationUrl: string
}

export const SignupEmail = ({
  siteName,
  siteUrl,
  recipient,
  confirmationUrl,
}: SignupEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Confirm your email to start exploring Regent</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoWrap}>
          <Img src={brand.logoUrl} alt="Regent" width="140" style={logo} />
        </Section>
        <Section style={headerBar} />
        <Heading style={h1}>Welcome to Regent</Heading>
        <Text style={text}>
          Thanks for signing up. Please confirm your email address (
          <Link href={`mailto:${recipient}`} style={link}>{recipient}</Link>
          ) to activate your account and start exploring our premium residential projects in Dhaka.
        </Text>
        <Section style={{ textAlign: 'center', margin: '30px 0' }}>
          <Button style={button} href={confirmationUrl}>Confirm Email</Button>
        </Section>
        <Text style={text}>
          Or copy and paste this link into your browser:
          <br />
          <Link href={confirmationUrl} style={link}>{confirmationUrl}</Link>
        </Text>
        <hr style={divider} />
        <Text style={footer}>
          If you didn't create a Regent account, you can safely ignore this email.
        </Text>
        <Text style={footer}>
          © {new Date().getFullYear()} Regent Design &amp; Development Ltd. ·{' '}
          <Link href={siteUrl} style={footerLink}>{siteName}</Link>
        </Text>
      </Container>
    </Body>
  </Html>
)

export default SignupEmail
