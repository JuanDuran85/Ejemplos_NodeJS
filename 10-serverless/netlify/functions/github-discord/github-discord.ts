import type { Handler } from "@netlify/functions";

const onStart: (payload: any) => string = (payload: any): string => {
  let message: string = "";
  const { starred_at, action, sender, repository } = payload;

  if (starred_at) {
    message = `User ${sender?.login} ${action} star on ${repository?.full_name}`;
  } else {
    message = `User ${sender?.login} ${action} end star on ${repository?.full_name}`;
  }

  return message;
};

const onIssue: (payload: any) => string = (payload: any): string => {
  const { action, issue, repository, sender } = payload;

  if (action === "opened") {
    return `An issue was opened with this title ${issue?.title}. Created by ${sender?.login} in ${repository?.full_name}`;
  }

  if (action === "closed") {
    return `An issue was closed with this title ${issue?.title}. Created by ${sender?.login} in ${repository?.full_name}`;
  }

  if (action === "reopened") {
    return `An issue was reopened with this title ${issue?.title}. Created by ${sender?.login} in ${repository?.full_name}`;
  }

  return `Unhandled action for the issue event ${action}. Created by ${sender?.login} in ${repository?.full_name}`;
};

const notify: (message: string) => Promise<boolean> = async (
  message: string
) => {
  const body = {
    content: message,
    username: "Github Webhook",
    avatar_url:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.icons8.com%2Fp1em%2F1200%2Fgithub.jpg&f=1&nofb=1&ipt=4632017fc1a14f1e5f03eb01ea1f30dad81f751d25c2c7e5720dc1e094efbe0b",
  };

  const response: Response = await fetch(
    //@ts-ignore
    process.env.DISCORD_WEBHOOK_URL ?? "",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    console.error(response);
    return false;
  }

  return true;
};

export const handler: Handler = async (event, context) => {
  const githubEvent: string = event.headers["x-github-event"] ?? "unknown";
  if (!event.body) {
    event.body = "{}";
  }
  const payload = JSON.parse(event.body);
  let message: string = "";

  switch (githubEvent) {
    case "star":
      message = onStart(payload);
      break;

    case "issues":
      message = onIssue(payload);
      break;

    default:
      message = `Unknown Event ${githubEvent} `;
      break;
  }
  console.debug(message);
  await notify(message);

  return {
    body: JSON.stringify({ message }),
    statusCode: 200,
  };
};
