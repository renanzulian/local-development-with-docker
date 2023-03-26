import { serve } from "https://deno.land/std@0.175.0/http/server.ts";
import { AppError } from "./errors.ts";
import { routes } from "./routes.ts";

async function handler(req: Request): Promise<Response> {
  try {
    const route = routes.find((route) => route.pattern.exec(req.url));
    if (route) return await route.handler(req);
    return new Response("Not found", {
      status: 404,
    });
  } catch (error) {
    return new Response(error.message, {
      status: error instanceof AppError ? 400 : 500,
    });
  }
}

console.log("Listening on http://localhost:8000");
serve(handler);
