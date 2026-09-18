import "primeicons/primeicons.css";
import Navbar from "./Navbar";
import { NavbarProvider } from "./NavbarProvider";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <NavbarProvider>
      <Navbar />
      {children}
    </NavbarProvider>
  );
}
