import { FreshContext, MiddlewareHandler } from "$fresh/server.ts";

type State = {
  dni: string;
}

export const handler: MiddlewareHandler<State> = async (req: Request, ctx: FreshContext<State>) => {
  const cookie = req.headers.get("cookie");
  const cookies = cookie?.split(";").map(c => c.trim());
  const dni_cookie = cookies?.find(c => c.startsWith("dni="));

  if (dni_cookie) {
    const dni = dni_cookie.split("=")[1];
    ctx.state = { dni };
    return await ctx.next();
  }

  return new Response(null, {
    status: 302,
    headers: {
      location: "/"
    }
  });
}
