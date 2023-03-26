// deno-lint-ignore-file require-await
import { Operation } from "./models.ts";
import { createWallet, getWallets, operate } from "./service.ts";

interface Route {
  pattern: URLPattern;
  handler: (req: Request) => Promise<Response>;
}

const balanceManagement = {
  pattern: new URLPattern({ pathname: "/wallets/:id" }),
  handler: async (req: Request): Promise<Response> => {
    const walletId = req.url.split("/wallets/")[1] as string;
    const operation = await req.json() as Operation;
    if (req.method === "POST") {
      return Response.json(operate(operation, walletId));
    }
    return new Response("Not found", {
      status: 404,
    });
  },
};

const walletManagement = {
  pattern: new URLPattern({ pathname: "/wallets" }),
  handler: async (req: Request): Promise<Response> => {
    if (req.method === "POST") return Response.json(createWallet());
    if (req.method === "GET") return Response.json(getWallets());
    return new Response("Not found", {
      status: 404,
    });
  },
};

export const routes: Route[] = [
  balanceManagement,
  walletManagement,
];

export async function handler(req: Request): Promise<Response> {
  const route = routes.find((route) => route.pattern.exec(req.url));
  if (route) return route.handler(req);
  return new Response("Not found", {
    status: 404,
  });
}
