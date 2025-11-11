export const httpClientPlugin: {
  get: (url: string) => Promise<any>;
} = {
  get: async (url: string) => {
    const response: Response = await fetch(url);
    return response.json();
  },
};
