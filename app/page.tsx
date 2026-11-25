import { connection } from "next/server";
import Home from "./home/Home";
import { readHomeDocument } from "@/lib/home-store";

export default async function Page() {
  await connection();
  const { published } = await readHomeDocument();
  return <Home content={published} />;
}
