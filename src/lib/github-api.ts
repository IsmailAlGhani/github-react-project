import type {
  GitHubUser,
  GitHubRepository,
  GitHubSearchResponse,
} from "./types";

const GITHUB_API_BASE = "https://api.github.com";

class GitHubAPIError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "GitHubAPIError";
    this.status = status;
  }
}

async function fetchFromGitHub<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "GitHub-Explorer-App",
    },
  });

  if (!response.ok) {
    if (response.status === 403) {
      throw new GitHubAPIError(
        "API rate limit exceeded. Please try again later.",
        403
      );
    }
    if (response.status === 404) {
      throw new GitHubAPIError("Resource not found.", 404);
    }
    throw new GitHubAPIError(
      `GitHub API error: ${response.statusText}`,
      response.status
    );
  }

  return response.json();
}

export async function searchUsers(query: string): Promise<GitHubUser[]> {
  if (!query.trim()) {
    return [];
  }

  try {
    const data = await fetchFromGitHub<GitHubSearchResponse>(
      `/search/users?q=${encodeURIComponent(query)}&per_page=5`
    );
    return data.items;
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
}

export async function getUserRepositories(
  username: string
): Promise<GitHubRepository[]> {
  if (!username.trim()) {
    return [];
  }

  try {
    const data = await fetchFromGitHub<GitHubRepository[]>(
      `/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100`
    );
    return data;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    throw error;
  }
}
