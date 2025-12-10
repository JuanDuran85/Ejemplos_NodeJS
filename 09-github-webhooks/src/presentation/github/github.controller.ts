import { Request, Response } from "express";
import { GitHubService } from '../services/github.service';

export class GithubController {
    constructor(
        private readonly gitHubService: GitHubService
    ) { }

    public webhookHandler = (req: Request, res: Response) => {
        const githubEvent: string = req.header("x-github-event") ?? "unknown";
        const signature: string = req.header("x-hub-signature-256") ?? "unknown";
        const payload = req.body;
        let message: string = "";

        switch (githubEvent) {
            case "star":
                message = this.gitHubService.onStart(payload);
                break;

            default:
                message = `Unknown Event ${githubEvent} `;
                break;
        }
        console.debug(message);

        res.status(201).send("Accepted");
    }
}