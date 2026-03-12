import { existsSync } from "node:fs";
import { join, normalize, sep } from "node:path";

const distDir = join(process.cwd(), "dist");
const indexPath = join(distDir, "index.html");
const port = Number.parseInt(process.env.PORT ?? "3000", 10);

if (!existsSync(indexPath)) {
  throw new Error("dist/index.html is missing. Run `bun run build` before starting the server.");
}

function resolveDistPath(pathname: string) {
  const relativePath = normalize(pathname === "/" ? "/index.html" : pathname).replace(/^[/\\]+/, "");
  const filePath = join(distDir, relativePath);

  if (filePath !== distDir && !filePath.startsWith(`${distDir}${sep}`)) {
    return null;
  }

  return filePath;
}

Bun.serve({
  hostname: "0.0.0.0",
  port,
  fetch(req) {
    if (req.method !== "GET" && req.method !== "HEAD") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const pathname = decodeURIComponent(new URL(req.url).pathname);
    const filePath = resolveDistPath(pathname);
    const looksLikeAsset = pathname.split("/").pop()?.includes(".") ?? false;

    if (filePath && existsSync(filePath)) {
      return new Response(Bun.file(filePath));
    }

    if (looksLikeAsset) {
      return new Response("Not Found", { status: 404 });
    }

    return new Response(Bun.file(indexPath));
  },
});

console.log(`Listening on ${port}`);