import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import { Web3AuthSignerProvider } from "./context/web3-auth-signer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  //manifest: "/public/manifest.json",
  title: "BLOK Capital Community",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3AuthSignerProvider>
          <div className="fixed top-0 w-full z-50">
            <Navbar />
          </div>
          <div className="container mx-auto  sm:px-6 md:px-5 pt-16 sm:pt-16 md:pt-24">
            <div className="flex flex-col  sm:flex-row space-y-6 sm:space-y-0  w-full">
              <div className="">
                <Sidebar />
              </div>
              <div className="flex-grow mx-2 w-full lg:pl-64 ">{children}</div>
            </div>
          </div>
        </Web3AuthSignerProvider>
      </body>
    </html>
  );
}
