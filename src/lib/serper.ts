const API_KEY = process.env.SERPER_API_KEY!;

export async function getDescription(query: string) {
  const url = `https://google.serper.dev/search`;

  const body = JSON.stringify({ q: query });

  const headers = {
    "X-API-KEY": API_KEY,
  };

  const response = await fetch(url, { method: "POST", headers, body });

  const data: unknown = await response.json();
}
