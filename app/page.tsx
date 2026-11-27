import { connection } from "next/server";
import { readContent } from "@/lib/content";
import { leerWeb } from "@/lib/empresas-db";
import Landing from "./(landing)/landing";

export default async function Home() {
  await connection();
  const [event, { tracks, cinta }] = await Promise.all([readContent(), leerWeb()]);
  return <Landing event={event} tracks={tracks} cinta={cinta} />;
}
