/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body, Button, Container, Head, Heading, Html, Img, Link, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'

import { brand, main, container, logoWrap, logo, headerBar, h1, text, link, button, divider, footer, footerLink } from './_styles.ts'

interface InviteEmailProps {
  siteName: string
  siteUrl: string
  confirmationUrl: string
}

export const InviteEmail = ({ siteName, siteUrl, confirmationUrl }: InviteEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>You've been invited to join Regent</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoWrap}>
          <Img src={brand.logoUrl} alt="Regent" width="140" style={logo} />
        </Section>
        <Section style={headerBar} />
        <Heading style={h1}>You're invited to {siteName}</Heading>
        <Text style={text}>
          You've been invited to join <Link href={siteUrl} style={link}><strong>{siteName}</strong></Link>. Accept your invitation to set up your account and explore our premium residential projects.
        </Text>
        <Section style={{ textAlign: 'center', margin: '30px 0' }}>
          <Button style={button} href={confirmationUrl}>Accept Invitation</Button>
        </Section>
        <Text style={text}>
          Or copy and paste this link into your browser:
          <br />
          <Link href={confirmationUrl} style={link}>{confirmationUrl}</Link>
        </Text>
        <hr style={divider} />
        <Text style={footer}>
          If you weren't expecting this invitation, you can safely ignore this email.
        </Text>
        <Text style={footer}>
          © {new Date().getFullYear()} Regent Design &amp; Development Ltd. ·{' '}
          <Link href={siteUrl} style={footerLink}>{siteName}</Link>
        </Text>
      </Container>
    </Body>
  </Html>
)

export default InviteEmail
