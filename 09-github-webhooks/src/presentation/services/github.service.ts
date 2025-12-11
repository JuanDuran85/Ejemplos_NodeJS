import { GithubIssuePayload, GitHubStarPayload } from "../../interfaces";

export class GitHubService {
    public onStart(payload: GitHubStarPayload): string {
        let message: string = "";
        const { starred_at, action, sender, repository } = payload;

        if (starred_at) {
            message = `User ${sender.login} ${action} star on ${repository.full_name}`;
        } else {
            message = `User ${sender.login} ${action} end star on ${repository.full_name}`;
        }

        return message;
    }

    public onIssue(payload: GithubIssuePayload): string {
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
    }
}
