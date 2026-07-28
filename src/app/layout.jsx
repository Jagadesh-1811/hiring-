import "./globals.css";

export const metadata = {
  title: "Hi Devs Hiring Search Engine",
  description: "Next-generation talent intelligence and enterprise sourcing hub built on custom designs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background text-on-background font-sans overflow-hidden antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
