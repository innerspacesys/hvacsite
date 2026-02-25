import "./globals.css";

export const metadata = {
  title: "Evergreen HVAC | Heating & Air",
  description: "Heating & cooling done right. Fast service, fair pricing, clean work.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}