import "./globals.css";
import { Inter } from "next/font/google";

import { ClientProvider } from "../Redux/Provider";
const inter = Inter({ subsets: ["latin"] });
import ProgresBar from "@/components/Progresbar/ProgresBar";
export const metadata = {
  title: "Codesgalaxy",
  description:
    "Codesgalexy is a social development environment for front-end designers and developers. Build and deploy a website, show off your work, build test cases to learn and debug, and find inspiration.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ClientProvider>
        <ProgresBar>
          <body className={inter.className}>{children}</body>
        </ProgresBar>
      </ClientProvider>
    </html>
  );
}
