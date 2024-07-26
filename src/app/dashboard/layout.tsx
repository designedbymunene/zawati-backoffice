import Navbar from "@/components/shared/navbar";
import Sidebar from "@/components/shared/sidebar/sidebar";
import React, { ReactNode } from "react";

const DashboardLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main>
      <Navbar />
      <Sidebar />
      <section className=" pt-14 px-10 sm:ml-64 sm:mt-6">{children}</section>
    </main>
  );
};

export default DashboardLayout;
