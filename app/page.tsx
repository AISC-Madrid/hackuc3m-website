import { connection } from "next/server";
import { readContent } from "@/lib/content";
import EventPage from "./event-page";
export default async function Home() {
  await connection();
  return <EventPage event={await readContent()} />;
}
