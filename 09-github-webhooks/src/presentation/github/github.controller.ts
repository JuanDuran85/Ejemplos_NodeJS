import { Request, Response } from "express";


export class GithubController {
    constructor() { }


    public webhookHandler = (req: Request, res: Response) => {
        res.status(200).json({
            message: "Webhook received",
        });
    }

}