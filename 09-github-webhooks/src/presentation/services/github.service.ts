import { GitHubStarPayload } from "../../interfaces";

export class GitHubService {

    public onStart(payload: GitHubStarPayload): string {
        let message: string = "";
        const { starred_at, action, sender, repository } = payload;
        console.debug({ starred_at });

        if(starred_at) {
            message = `User ${sender.login} ${action} star on ${repository.full_name}`;
        } else {
            message = `User ${sender.login} ${action} end star on ${repository.full_name}`;
        }


        return message;
    }
}