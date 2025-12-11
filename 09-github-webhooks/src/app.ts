import express from "express";
import { EnvVarAdapter } from "./config";
import {
  DiscordService,
  GithubController,
  GitHubService,
} from "./presentation";
import { GitHubSha256Middleware } from "./presentation/middleware";

const { PORT, DISCORD_WEBHOOK_URL, SECRET_TOKEN } = EnvVarAdapter.getEnvs();

(() => {
  main();
})();

function main() {
  const app = express();
  app.use(express.json());
  app.use(GitHubSha256Middleware.verifyGithubSignature);
  const githubService: GitHubService = new GitHubService();
  const discordService: DiscordService = new DiscordService(
    DISCORD_WEBHOOK_URL
  );
  const githubController: GithubController = new GithubController(
    githubService,
    discordService
  );
  app.post("/api/github", githubController.webhookHandler);

  app.listen(PORT, () => {
    console.log(`Server is running and listening on port ${PORT}`);
  });
}
