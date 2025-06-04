"use client";

import { useQuery } from "@tanstack/react-query";
import { RepositoryCard } from "@/components/repository-card";
import { LoadingSpinner } from "@/components/loading-spinner";
import { ErrorMessage } from "@/components/error-message";
import { getUserRepositories } from "@/lib/github-api";
import { FolderGit2 } from "lucide-react";

interface RepositoryListProps {
  username: string;
}

export function RepositoryList({ username }: RepositoryListProps) {
  const {
    data: repositories,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["repositories", username],
    queryFn: () => getUserRepositories(username),
    enabled: !!username,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  if (isLoading) {
    return <LoadingSpinner message="Loading repositories..." />;
  }

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  if (!repositories || repositories.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500 dark:text-slate-400">
        <FolderGit2 className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p>No public repositories found</p>
        <p className="text-sm mt-1">
          This user hasn't created any public repositories yet
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-[600px] overflow-y-auto px-2">
      {repositories.map((repo) => (
        <RepositoryCard key={repo.id} repository={repo} />
      ))}
      <p className="text-xs text-slate-500 dark:text-slate-400 text-center pt-2">
        Showing {repositories.length} repositories
      </p>
    </div>
  );
}
