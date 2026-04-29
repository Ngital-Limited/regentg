/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body, Button, Container, Head, Heading, Html, Img, Link, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'

import { brand, main, container, logoWrap, logo, headerBar, h1, text, link, button, divider, footer, footerLink } from './_styles.ts'

interface RecoveryEmailProps {
  siteName: string
  siteUrl?: string
  confirmationUrl: string
}

export const RecoveryEmail = ({ siteName, siteUrl, confirmationUrl }: RecoveryEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Reset your Regent password</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoWrap}>
          <Img src={brand.logoUrl} alt="Regent" width="140" style={logo} />
        </Section>
        <Section style={headerBar} />
        <Heading style={h1}>Reset your password</Heading>
        <Text style={text}>
          We received a request to reset the password for your {siteName} account. Click the button below to choose a new password.
        </Text>
        <Section style={{ textAlign: 'center', margin: '30px 0' }}>
          <Button style={button} href={confirmationUrl}>Reset Password</Button>
        </Section>
        <Text style={text}>
          Or copy and paste this link into your browser:
          <br />
          <Link href={confirmationUrl} style={link}>{confirmationUrl}</Link>
        </Text>
        <hr style={divider} />
        <Text style={footer}>
          If you didn't request a password reset, you can safely ignore this email — your password will remain unchanged.
        </Text>
        <Text style={footer}>
          © {new Date().getFullYear()} Regent Design &amp; Development Ltd.{siteUrl ? ' · ' : ''}
          {siteUrl ? <Link href={siteUrl} style={footerLink}>{siteName}</Link> : null}
        </Text>
      </Container>
    </Body>
  </Html>
)

export default RecoveryEmail
