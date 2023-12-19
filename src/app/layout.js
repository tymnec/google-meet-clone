import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Google Meet Clone",
  description: "Created by Nikhil and Vansh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={inter.className}>
          <div className="py-2 m-1">{children}</div>
        </body>
      </ClerkProvider>
    </html>
  );
}
