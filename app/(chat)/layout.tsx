import { Metadata } from "next";

import { Navbar } from "@/components/custom/navbar";


export const metadata: Metadata = {
  title: "Meteor Linker",
  description: "Meteor Linker",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
         <Navbar />
          {children}
      </body>
    </html>
  );
}
