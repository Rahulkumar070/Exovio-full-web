"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import MobileMenu from "./MobileMenu";
import Footer from "./Footer";

interface Props {
  children: React.ReactNode;
}

export default function SubPageShell({ children }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* isLoaded=true — sub-pages animate immediately, no preloader */}
      <Navbar isLoaded={true} onMenuOpen={() => setMenuOpen(true)} />
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
