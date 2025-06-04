export interface GitHubUser {
  id: number
  login: string
  avatar_url: string
  html_url: string
  name?: string
  company?: string
  location?: string
  email?: string
  bio?: string
  public_repos: number
  followers: number
  following: number
  type: "User" | "Organization"
  created_at: string
}

export interface GitHubRepository {
  id: number
  name: string
  full_name: string
  description?: string
  html_url: string
  private: boolean
  fork: boolean
  language?: string
  stargazers_count: number
  watchers_count: number
  forks_count: number
  open_issues_count: number
  topics?: string[]
  created_at: string
  updated_at: string
  pushed_at: string
  size: number
  default_branch: string
}

export interface GitHubSearchResponse {
  total_count: number
  incomplete_results: boolean
  items: GitHubUser[]
}
