import type { Metadata } from 'next'
import { SITE_URL } from '../config/general'
import './globals.css'
import AppWrapper from '../components/common/AppWrapper'

export const metadata: Metadata = {
  title: 'INKhronizer - Banner Creator | Ink',
  description:
    'Ink, INKhronizer, the custom banner builder of Ink - an inscription project on BTC, for the community, by the community - INK Is For The People.',
  applicationName: 'Ink Community Website',
  authors: [{ name: 'Ink' }, { name: 'Sennett Lau (Capyyy)', url: 'https://sennettlau.me' }],
  generator: 'Next.js',
  keywords: ['Ink', 'BTC', 'InkOnBTC', 'Inscriptions', 'Ordinals', 'Legacy Sats'],
  viewport: 'width=device-width, initial-scale=1.0',
  alternates: {
    canonical: SITE_URL,
    languages: {
      'en-US': SITE_URL,
    },
  },
  icons: [`${SITE_URL}/logo-pack/logo_128.png`],
  openGraph: {
    title: 'INKhronizer - Banner Creator | Ink',
    description:
      'INKhronizer, the custom banner builder of Ink - an inscription project on BTC, for the community, by the community - INK Is For The People.',
    images: [
      {
        url: `${SITE_URL}/banner.png`,
        alt: 'Ink',
        width: 3840,
        height: 2160,
      },
    ],
  },
  twitter: {
    title:
      'INKhronizer, the custom banner builder of Ink - an inscription project on BTC, for the community, by the community - INK Is For The People.',
    images: {
      url: `${SITE_URL}/banner.png`,
      alt: 'Ink',
      width: 3840,
      height: 2160,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <AppWrapper>{children}</AppWrapper>
    </html>
  )
}
