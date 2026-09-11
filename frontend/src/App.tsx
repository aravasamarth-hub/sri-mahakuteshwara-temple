import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import TempleLayout from "@/components/TempleLayout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Poojas from "@/pages/Poojas";
import Donations from "@/pages/Donations";
import Rooms from "@/pages/Rooms";
import Halls from "@/pages/Halls";
import Contact from "@/pages/Contact";
import Admin from "@/pages/Admin";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Toaster position="top-center" richColors />
      <Routes>
        <Route element={<TempleLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/timings" element={<Navigate to="/about" replace />} />
          <Route path="/poojas" element={<Poojas />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/halls" element={<Halls />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </>
  );
}
