import { Inter } from "next/font/google";
import { UserProvider } from '@auth0/nextjs-auth0/client';

import "./globals.css";
const inter = Inter({ subsets: ["latin"] });



export const metadata = {
  title: "AC Controllers",
  description: "Web Site for AC Controllers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
      <body className={inter.className + " bg-zinc-100"}>{children}</body>
      </UserProvider>
    </html>
  );
}
