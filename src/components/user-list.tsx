"use client"

import { useQuery } from "@tanstack/react-query"
import { UserCard } from "@/components/user-card"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ErrorMessage } from "@/components/error-message"
import { searchUsers } from "@/lib/github-api"
import { Users } from "lucide-react"

interface UserListProps {
  query: string
}

export function UserList({ query }: UserListProps) {
  const {
    data: users,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["users", query],
    queryFn: () => searchUsers(query),
    enabled: !!query && query.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })

  if (!query) {
    return (
      <div className="text-center py-12 text-slate-500 dark:text-slate-400">
        <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>Enter a username to search for GitHub users</p>
      </div>
    )
  }

  if (isLoading) {
    return <LoadingSpinner message="Searching users..." />
  }

  if (isError) {
    return <ErrorMessage error={error} />
  }

  if (!users || users.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500 dark:text-slate-400">
        <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p>No users found matching "{query}"</p>
        <p className="text-sm mt-1">Try a different search term</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
      {users.length === 5 && (
        <p className="text-xs text-slate-500 dark:text-slate-400 text-center pt-2">
          Showing top 5 results. Refine your search for more specific results.
        </p>
      )}
    </div>
  )
}
