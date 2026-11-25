import "primeicons/primeicons.css";
import { connection } from "next/server";
import { readHomeDocument } from "@/lib/home-store";
import Navbar from "./Navbar";
import { NavbarProvider } from "./NavbarProvider";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  await connection();
  const { published } = await readHomeDocument();
  return (
    <NavbarProvider>
      <Navbar navigation={published.navigation} />
      {children}
    </NavbarProvider>
  );
}
