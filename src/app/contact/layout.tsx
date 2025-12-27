import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Ready to reclaim your space? Book your free Combat Clutter consultation today. Serving the Greater Atlanta area.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
