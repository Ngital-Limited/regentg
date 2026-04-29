/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body, Container, Head, Heading, Html, Img, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'

import { brand, main, container, logoWrap, logo, headerBar, h1, text, code, divider, footer } from './_styles.ts'

interface ReauthenticationEmailProps {
  token: string
}

export const ReauthenticationEmail = ({ token }: ReauthenticationEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your Regent verification code</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoWrap}>
          <Img src={brand.logoUrl} alt="Regent" width="140" style={logo} />
        </Section>
        <Section style={headerBar} />
        <Heading style={h1}>Confirm it's you</Heading>
        <Text style={text}>Use the verification code below to confirm your identity:</Text>
        <Section style={{ textAlign: 'center' }}>
          <Text style={code}>{token}</Text>
        </Section>
        <hr style={divider} />
        <Text style={footer}>
          This code will expire shortly. If you didn't request this, you can safely ignore this email.
        </Text>
        <Text style={footer}>
          © {new Date().getFullYear()} Regent Design &amp; Development Ltd.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default ReauthenticationEmail
