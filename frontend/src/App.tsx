import { Routes, Route } from "react-router-dom";
import TempleLayout from "@/components/TempleLayout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Timings from "@/pages/Timings";
import Poojas from "@/pages/Poojas";
import Donations from "@/pages/Donations";
import Rooms from "@/pages/Rooms";
import Halls from "@/pages/Halls";
import Contact from "@/pages/Contact";

// One <Route> per page in src/pages; BrowserRouter already wraps this in main.tsx.
export default function App() {
  return (
    <Routes>
      <Route element={<TempleLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/timings" element={<Timings />} />
        <Route path="/poojas" element={<Poojas />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/halls" element={<Halls />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}
