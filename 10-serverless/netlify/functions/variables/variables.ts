import type { Context } from "@netlify/functions";

const handler: (req: Request, context: Context) => Promise<Response> = async (
  req: Request,
  context: Context
) => {

    // @ts-ignore 
    const myImportantVariable = process.env.MY_IMPORTANT_VARIABLE;
    console.debug(myImportantVariable);
    console.debug("Variables logs ....");

    if(!myImportantVariable) {
      return new Response("Something went wrong...", { status: 500 });
    }

  return new Response("Message from Netlify - Variables...", { status: 200 });
};

export default handler;
