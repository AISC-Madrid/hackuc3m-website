import { connection } from "next/server";
import { readContent } from "@/lib/content";
import Landing from "./(landing)/landing";

export default async function Home() {
  await connection();
  return <Landing event={await readContent()} />;
}
