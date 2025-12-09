import express from "express";
import { EnvVarAdapter } from "./config";
import { GithubController } from "./presentation";

const { PORT, PUBLIC_PATH } = EnvVarAdapter.getEnvs();

(() => {
    main();
})()

function main() {
    const app = express();
    const githubController: GithubController = new GithubController();
    app.post("/api/github", githubController.webhookHandler);

    app.listen(PORT, () => {
        console.log(`Server is running and listening on port ${PORT}`);
    });

}