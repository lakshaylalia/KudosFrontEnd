"use client";

import Footer from "@/components/Footer";
import HelpCenter from "@/components/HelpCenter";
import { useEffect } from "react";

const FaqPage: React.FC = () => {
  useEffect(() => {
    console.log("FaqPage mounted");
  }, []);

  return (
    <section className="w-full h-screen">
      <HelpCenter />
      <Footer />
    </section>
  );
};

export default FaqPage;

