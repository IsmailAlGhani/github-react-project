import { create } from "zustand"
import type { GitHubUser } from "./types"

interface GitHubStore {
  selectedUser: GitHubUser | null
  setSelectedUser: (user: GitHubUser | null) => void
}

export const useGitHubStore = create<GitHubStore>((set) => ({
  selectedUser: null,
  setSelectedUser: (user) => set({ selectedUser: user }),
}))
