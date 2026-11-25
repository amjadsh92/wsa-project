import { connection } from "next/server";
import { readHomeDocument } from "@/lib/home-store";
import AdminPanel from "./AdminPanel";

export const metadata = { title: "Home editor — KAAN", robots: { index: false, follow: false } };
export default async function AdminPage() {
  await connection();
  return <AdminPanel initialDocument={await readHomeDocument()} />;
}
