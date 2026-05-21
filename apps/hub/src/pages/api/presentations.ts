import type { APIRoute } from "astro";
import { readdir, readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

const PRESENTATIONS_DIR = path.resolve(process.cwd(), "../../data/portfolio/presentations");

export const GET: APIRoute = async () => {
  try {
    await mkdir(PRESENTATIONS_DIR, { recursive: true });
    const files = await readdir(PRESENTATIONS_DIR);
    const presentations = await Promise.all(
      files
        .filter((f) => f.endsWith(".json"))
        .map(async (f) => {
          const content = await readFile(path.join(PRESENTATIONS_DIR, f), "utf-8");
          return JSON.parse(content);
        })
    );
    return new Response(JSON.stringify(presentations), {
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify([]), {
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, slides } = body as { name: string; slides: string[] };

    if (!name?.trim()) {
      return new Response(JSON.stringify({ error: "Name is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    const presentation = {
      slug,
      name: name.trim(),
      theme: {
        accent: "#6366f1",
        background: "#09090b",
        foreground: "#fafafa",
      },
      slides: (slides || []).map((s: string) => {
        if (s.startsWith("case:")) return { type: "case", slug: s.replace("case:", "") };
        return { type: s };
      }),
      createdAt: new Date().toISOString(),
    };

    await mkdir(PRESENTATIONS_DIR, { recursive: true });
    await writeFile(
      path.join(PRESENTATIONS_DIR, `${slug}.json`),
      JSON.stringify(presentation, null, 2)
    );

    return new Response(JSON.stringify(presentation), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  try {
    const { slug } = (await request.json()) as { slug: string };
    const { unlink } = await import("fs/promises");
    await unlink(path.join(PRESENTATIONS_DIR, `${slug}.json`));
    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
