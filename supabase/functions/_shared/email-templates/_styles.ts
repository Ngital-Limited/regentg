// Shared Regent brand styles for auth email templates.
// Body background must remain white (#ffffff) per email guidelines.

export const brand = {
  sky: '#3EC9F3',
  navy: '#303192',
  dark: '#0D0D0D',
  charcoal: '#373229',
  muted: '#55575d',
  border: '#e5e7eb',
  logoUrl:
    'https://sixkpdtdmycoeovkxhcz.supabase.co/storage/v1/object/public/email-assets/regent-logo.png',
}

export const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  margin: 0,
  padding: '24px 0',
}

export const container = {
  maxWidth: '560px',
  margin: '0 auto',
  padding: '32px 32px 28px',
  backgroundColor: '#ffffff',
  border: `1px solid ${brand.border}`,
  borderRadius: '12px',
}

export const logoWrap = {
  textAlign: 'center' as const,
  padding: '8px 0 16px',
}

export const logo = {
  display: 'inline-block',
  height: 'auto',
}

export const headerBar = {
  height: '3px',
  backgroundColor: brand.sky,
  borderRadius: '2px',
  margin: '0 0 28px',
}

export const h1 = {
  fontSize: '22px',
  fontWeight: 700 as const,
  color: brand.dark,
  letterSpacing: '0.02em',
  margin: '0 0 16px',
}

export const text = {
  fontSize: '15px',
  color: brand.muted,
  lineHeight: '1.6',
  margin: '0 0 18px',
}

export const link = {
  color: brand.navy,
  textDecoration: 'underline',
}

export const button = {
  backgroundColor: brand.sky,
  color: brand.dark,
  fontSize: '14px',
  fontWeight: 600 as const,
  letterSpacing: '0.06em',
  textTransform: 'uppercase' as const,
  borderRadius: '8px',
  padding: '14px 28px',
  textDecoration: 'none',
  display: 'inline-block',
}

export const code = {
  display: 'inline-block',
  fontFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
  fontSize: '28px',
  fontWeight: 700 as const,
  letterSpacing: '0.4em',
  color: brand.dark,
  backgroundColor: '#f4f6f8',
  border: `1px solid ${brand.border}`,
  borderRadius: '8px',
  padding: '16px 24px',
  margin: '8px 0 24px',
}

export const divider = {
  border: 'none',
  borderTop: `1px solid ${brand.border}`,
  margin: '28px 0 20px',
}

export const footer = {
  fontSize: '12px',
  color: '#9ca3af',
  lineHeight: '1.6',
  margin: '0 0 6px',
  textAlign: 'center' as const,
}

export const footerLink = {
  color: brand.navy,
  textDecoration: 'none',
}
