import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LTX-2 Prompt Studio',
  description: 'Fully featured LTX-2 AI video prompt generator',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
        {children}
      </body>
    </html>
  );
}
