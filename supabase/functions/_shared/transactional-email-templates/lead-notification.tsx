import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Regent Group'

interface LeadNotificationProps {
  formType?: string
  name?: string
  email?: string
  phone?: string
  subject?: string
  message?: string
  projectName?: string
  jobTitle?: string
  cvUrl?: string
  submittedAt?: string
}

const LeadNotificationEmail = ({
  formType = 'New Lead',
  name,
  email,
  phone,
  subject,
  message,
  projectName,
  jobTitle,
  cvUrl,
  submittedAt,
}: LeadNotificationProps) => {
  const fields: Array<[string, string | undefined]> = [
    ['Form Type', formType],
    ['Name', name],
    ['Email', email],
    ['Phone', phone],
    ['Subject', subject],
    ['Project', projectName],
    ['Position', jobTitle],
    ['CV', cvUrl],
    ['Submitted At', submittedAt],
  ]

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>{`New ${formType} submission from ${name || 'a visitor'}`}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New {formType}</Heading>
          <Text style={intro}>
            A new submission has been received on the {SITE_NAME} website.
          </Text>
          <Hr style={hr} />
          <Section>
            {fields.map(([label, value]) =>
              value ? (
                <Section key={label} style={row}>
                  <Text style={fieldLabel}>{label}</Text>
                  <Text style={fieldValue}>{value}</Text>
                </Section>
              ) : null
            )}
            {message ? (
              <Section style={row}>
                <Text style={fieldLabel}>Message</Text>
                <Text style={fieldValue}>{message}</Text>
              </Section>
            ) : null}
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            This is an automated notification from {SITE_NAME}.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: LeadNotificationEmail,
  subject: (data: Record<string, any>) =>
    `[${data.formType || 'New Lead'}] ${data.name || 'Website submission'}`,
  displayName: 'Lead notification (admin)',
  to: 'tajul@ngital.com',
  previewData: {
    formType: 'Contact Form',
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '+880 1700 000000',
    subject: 'Inquiry about Regent Sapphire',
    message: 'I would like to schedule a visit to your Banani project.',
    submittedAt: new Date().toISOString(),
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, Helvetica, sans-serif' }
const container = { padding: '32px 28px', maxWidth: '560px', margin: '0 auto' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#0D0D0D', margin: '0 0 12px' }
const intro = { fontSize: '14px', color: '#55575d', margin: '0 0 16px' }
const hr = { borderColor: '#e5e5e5', margin: '20px 0' }
const row = { margin: '0 0 14px' }
const fieldLabel = { fontSize: '11px', color: '#999999', textTransform: 'uppercase' as const, letterSpacing: '0.08em', margin: '0 0 4px' }
const fieldValue = { fontSize: '14px', color: '#0D0D0D', margin: '0', lineHeight: '1.5' }
const footer = { fontSize: '11px', color: '#999999', margin: '20px 0 0' }
