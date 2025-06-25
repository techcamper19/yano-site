
export const metadata = {
  title: 'Zi Wei Dou Shu | Yano',
  description: 'Discover your personal blueprint through Chinese astrology.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
