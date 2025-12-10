import express from "express";
import { EnvVarAdapter } from "./config";
import { GithubController, GitHubService } from "./presentation";

const { PORT, PUBLIC_PATH } = EnvVarAdapter.getEnvs();

(() => {
    main();
})()

function main() {
    const app = express();
    app.use(express.json());
    const githubService: GitHubService = new GitHubService();
    const githubController: GithubController = new GithubController(githubService);
    app.post("/api/github", githubController.webhookHandler);

    app.listen(PORT, () => {
        console.log(`Server is running and listening on port ${PORT}`);
    });

}