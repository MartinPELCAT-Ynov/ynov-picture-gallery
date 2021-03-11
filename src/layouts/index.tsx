import React, { FC } from "react";
import { Footer } from "src/components/footer";
import { Header } from "src/components/header";

export const Layout: FC = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
};
