import React, { FC } from "react";
import { Footer } from "src/components/footer";
import { Header } from "src/components/header";

export const Layout: FC = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen max-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 relative w-full flex flex-col">{children}</main>
      <Footer />
    </div>
  );
};
