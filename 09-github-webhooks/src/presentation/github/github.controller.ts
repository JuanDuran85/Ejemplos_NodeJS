import { Request, Response } from "express";

export class GithubController {
    constructor() { }

    public webhookHandler = (req: Request, res: Response) => {
        const githubEvent: string = req.header("x-github-event") ?? "unknown";
        const signature: string = req.header("x-hub-signature-256") ?? "unknown";

        console.debug(githubEvent);
        console.debug(signature);

        res.status(201).send("Accepted");
    }
}