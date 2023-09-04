import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ko Vatuvembela',
  description: 'Projeto de integração de línguas Africanas',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}><div className="bg-red-700 p-8">{children}</div></body>
    </html>
  );
}
