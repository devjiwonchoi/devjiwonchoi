if (!process.env.GITHUB_ACCESS_TOKEN) {
  throw new Error("GITHUB_ACCESS_TOKEN is not set");
}

export async function fetchGitHubAPI({
  endpoint,
  url,
  method = "GET",
  body,
}: {
  endpoint?: string;
  url?: string;
  method?: string;
  body?: string;
}) {
  const GITHUB_API_URL = "https://api.github.com";
  url ??= `${GITHUB_API_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
      method,
      body,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from the GitHub API: ${data.message}`
      );
    }
    return data;
  } catch (error) {
    throw error;
  }
}
