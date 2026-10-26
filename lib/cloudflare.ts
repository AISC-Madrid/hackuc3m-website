import { getCloudflareContext } from "@opennextjs/cloudflare";
export async function bindings() {
  return (await getCloudflareContext({ async: true })).env;
}
