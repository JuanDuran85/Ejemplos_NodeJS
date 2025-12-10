import { Request, Response } from "express";
import { DiscordService, GitHubService } from "../services";

export class GithubController {
  constructor(
    private readonly gitHubService: GitHubService,
    private readonly discordService: DiscordService
  ) { }

  public webhookHandler = (req: Request, res: Response) => {
    const githubEvent: string = req.header("x-github-event") ?? "unknown";

    if (!req.body) {
      req.body = {};
    }

    const payload = req.body;

    let message: string = "";

    switch (githubEvent) {
      case "star":
        message = this.gitHubService.onStart(payload);
        break;

      case "issues":
        message = this.gitHubService.onIssue(payload);
        break;

      default:
        message = `Unknown Event ${githubEvent} `;
        break;
    }

    console.debug(message);
    this.discordService
      .notify(message)
      .then(() => res.status(202).send("Accepted"))
      .catch((err) => {
        console.error(err);
        res.status(500).send("Internal Server Error");
      });
  };
}
