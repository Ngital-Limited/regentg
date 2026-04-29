/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body, Button, Container, Head, Heading, Html, Img, Link, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'

import { brand, main, container, logoWrap, logo, headerBar, h1, text, link, button, divider, footer, footerLink } from './_styles.ts'

interface MagicLinkEmailProps {
  siteName: string
  siteUrl?: string
  confirmationUrl: string
}

export const MagicLinkEmail = ({ siteName, siteUrl, confirmationUrl }: MagicLinkEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your Regent login link</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoWrap}>
          <Img src={brand.logoUrl} alt="Regent" width="140" style={logo} />
        </Section>
        <Section style={headerBar} />
        <Heading style={h1}>Your secure login link</Heading>
        <Text style={text}>
          Click the button below to sign in to {siteName}. For your security, this link will expire shortly.
        </Text>
        <Section style={{ textAlign: 'center', margin: '30px 0' }}>
          <Button style={button} href={confirmationUrl}>Sign In</Button>
        </Section>
        <Text style={text}>
          Or copy and paste this link into your browser:
          <br />
          <Link href={confirmationUrl} style={link}>{confirmationUrl}</Link>
        </Text>
        <hr style={divider} />
        <Text style={footer}>
          If you didn't request this link, you can safely ignore this email.
        </Text>
        <Text style={footer}>
          © {new Date().getFullYear()} Regent Design &amp; Development Ltd.{siteUrl ? ' · ' : ''}
          {siteUrl ? <Link href={siteUrl} style={footerLink}>{siteName}</Link> : null}
        </Text>
      </Container>
    </Body>
  </Html>
)

export default MagicLinkEmail
