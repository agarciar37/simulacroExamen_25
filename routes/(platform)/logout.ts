import { FreshContext, Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET: (_req: Request, _ctx: FreshContext) => {
    const headers = new Headers();
    // Borramos la cookie poniéndola expirada
    headers.append("Set-Cookie", "dni=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT");
    headers.append("location", "/");
    return new Response(null, { status: 302, headers });
  }
};
