import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar.jsx";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BLOK Capital Community",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="fixed top-0 w-full z-50">
          <Navbar />
        </div>
        <div className="container mx-auto px-20 pt-32">
          <div className=" flex space-x-10 w-full ">
            <div className="fixed w-1/6  ">
              <Sidebar />
            </div>
            <div className="pl-80 w-full  max-w-screen-2xl ">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
//responshive

//import type { Metadata } from "next";
//import { Inter } from "next/font/google";
//import "./globals.css";
//import Navbar from "./components/navbar/Navbar";
//import Sidebar from "./components/sidebar/Sidebar.jsx";
//const inter = Inter({ subsets: ["latin"] });

//export const metadata: Metadata = {
//  title: "BLOK Capital Community",
//  description: "Generated by create next app",
//};

//export default function RootLayout({
//  children,
//}: {
//  children: React.ReactNode;
//}) {
//  return (
//    <html lang="en">
//      <body className={inter.className}>
//        <div className="fixed top-0 w-full z-50">
//          <Navbar />
//        </div>
//        <div className="container mx-auto px-4 sm:px-6 md:px-8 pt-16 sm:pt-24 md:pt-32">
//          <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-10 w-full">
//            <div className="sm:w-1/6">
//              <Sidebar />
//            </div>
//            <div className="flex-grow w-full max-w-screen-2xl">{children}</div>
//          </div>
//        </div>
//      </body>
//    </html>
//  );
//}
