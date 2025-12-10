
export class DiscordService {

    constructor(private readonly discordWebhookUrl: string) { }


    public async notify(message: string): Promise<boolean> {
        const body = {
            content: message,
            username: "Github Webhook",
            avatar_url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.icons8.com%2Fp1em%2F1200%2Fgithub.jpg&f=1&nofb=1&ipt=4632017fc1a14f1e5f03eb01ea1f30dad81f751d25c2c7e5720dc1e094efbe0b",
        }

        const response: Response = await fetch(this.discordWebhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        if (!response.ok) {
            console.error(response);
            return false;
        }

        return true;
    }
}