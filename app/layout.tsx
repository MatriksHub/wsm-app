import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: "MatriksHub - Workspace Management App",
  description: "Workspace management app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
