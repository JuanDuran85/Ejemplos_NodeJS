import type { Context } from "@netlify/functions";

const handler: (req: Request, context: Context) => Promise<Response> = async (
  req: Request,
  context: Context
) => {
  console.debug("Hello file functions");
  return new Response("Message from Netlify...", { status: 200 });
};

export default handler;
