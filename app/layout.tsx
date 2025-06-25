import './globals.css';

export const metadata = {
  title: 'Yano’s Destiny Blueprint',
  description: 'Discover your personal blueprint through Zi Wei Dou Shu',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
