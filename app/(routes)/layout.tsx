import { Metadata } from "next";

import Header from "@/components/custom/Header";


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
         <Header />
          {children}
      </body>
    </html>
  );
}
