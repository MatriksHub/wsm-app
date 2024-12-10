import type { Metadata } from "next";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

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
      <body>
        <ToastContainer limit={1} position="top-center" />
        {children}
      </body>
    </html>
  );
}

