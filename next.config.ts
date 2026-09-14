import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cada worktree tiene su propio package-lock.json: fijamos la raíz aquí
  // para que Turbopack no suba al repositorio padre.
  turbopack: {
    root: path.resolve(__dirname),
  },
  output: "standalone",
};

export default nextConfig;