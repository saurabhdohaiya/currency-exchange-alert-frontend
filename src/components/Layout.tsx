import React from "react";
import HeaderComponent from "./HeaderComponent";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderComponent />
      <main className="flex flex-col flex-grow">{children}</main>
    </div>
  );
};

export default Layout;
