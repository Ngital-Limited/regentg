/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body, Button, Container, Head, Heading, Html, Img, Link, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'

import { brand, main, container, logoWrap, logo, headerBar, h1, text, link, button, divider, footer, footerLink } from './_styles.ts'

interface EmailChangeEmailProps {
  siteName: string
  siteUrl?: string
  email: string
  newEmail: string
  confirmationUrl: string
}

export const EmailChangeEmail = ({
  siteName, siteUrl, email, newEmail, confirmationUrl,
}: EmailChangeEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Confirm your email change for Regent</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoWrap}>
          <Img src={brand.logoUrl} alt="Regent" width="140" style={logo} />
        </Section>
        <Section style={headerBar} />
        <Heading style={h1}>Confirm your email change</Heading>
        <Text style={text}>
          You requested to change the email on your {siteName} account from{' '}
          <Link href={`mailto:${email}`} style={link}>{email}</Link> to{' '}
          <Link href={`mailto:${newEmail}`} style={link}>{newEmail}</Link>.
        </Text>
        <Text style={text}>Please confirm this change by clicking the button below.</Text>
        <Section style={{ textAlign: 'center', margin: '30px 0' }}>
          <Button style={button} href={confirmationUrl}>Confirm Email Change</Button>
        </Section>
        <hr style={divider} />
        <Text style={footer}>
          If you didn't request this change, please secure your account immediately.
        </Text>
        <Text style={footer}>
          © {new Date().getFullYear()} Regent Design &amp; Development Ltd.{siteUrl ? ' · ' : ''}
          {siteUrl ? <Link href={siteUrl} style={footerLink}>{siteName}</Link> : null}
        </Text>
      </Container>
    </Body>
  </Html>
)

export default EmailChangeEmail
