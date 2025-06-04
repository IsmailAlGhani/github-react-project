"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { GitHubRepository } from "@/lib/types";
import {
  ExternalLink,
  Star,
  GitFork,
  Eye,
  Calendar,
  Lock,
  Unlock,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface RepositoryCardProps {
  repository: GitHubRepository;
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
  const handleViewRepository = () => {
    window.open(repository.html_url, "_blank", "noopener,noreferrer");
  };

  const updatedAt = new Date(repository.updated_at);
  const timeAgo = formatDistanceToNow(updatedAt, { addSuffix: true });

  return (
    <Card className="!py-3 group hover:shadow-sm transition-all duration-200 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 border-slate-200/50 dark:border-slate-700/50">
      <CardContent className="p-3">
        <div className="space-y-2.5">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-slate-800 dark:text-slate-200 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {repository.name}
                </h3>
                <div className="flex items-center gap-1">
                  {repository.private ? (
                    <Lock className="w-3 h-3 text-amber-500" />
                  ) : (
                    <Unlock className="w-3 h-3 text-green-500" />
                  )}
                </div>
              </div>
              {repository.description && (
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mt-0.5">
                  {repository.description}
                </p>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleViewRepository}
              className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Language and Topics */}
          <div className="flex flex-wrap gap-1.5 min-h-[1.5rem]">
            {repository.language && (
              <Badge
                variant="secondary"
                className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                {repository.language}
              </Badge>
            )}
            {repository.topics?.slice(0, 3).map((topic) => (
              <Badge
                key={topic}
                variant="outline"
                className="text-xs px-2 py-0.5 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/50"
              >
                {topic}
              </Badge>
            ))}
            {repository.topics && repository.topics.length > 3 && (
              <Badge
                variant="outline"
                className="text-xs px-2 py-0.5 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
              >
                +{repository.topics.length - 3} more
              </Badge>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-500" />
              <span>{repository.stargazers_count.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <GitFork className="w-3.5 h-3.5 text-blue-500" />
              <span>{repository.forks_count.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-purple-500" />
              <span>{repository.watchers_count.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1 ml-auto">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{timeAgo}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
