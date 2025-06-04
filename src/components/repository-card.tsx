"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { GitHubRepository } from "@/lib/types"
import { ExternalLink, Star, GitFork, Eye, Calendar, Lock, Unlock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface RepositoryCardProps {
  repository: GitHubRepository
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
  const handleViewRepository = () => {
    window.open(repository.html_url, "_blank", "noopener,noreferrer")
  }

  const updatedAt = new Date(repository.updated_at)
  const timeAgo = formatDistanceToNow(updatedAt, { addSuffix: true })

  return (
    <Card className="hover:shadow-md transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-800/50">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 truncate">{repository.name}</h3>
                <div className="flex items-center gap-1">
                  {repository.private ? (
                    <Lock className="w-3 h-3 text-slate-400" />
                  ) : (
                    <Unlock className="w-3 h-3 text-slate-400" />
                  )}
                </div>
              </div>
              {repository.description && (
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{repository.description}</p>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={handleViewRepository} className="shrink-0">
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>

          {/* Language and Topics */}
          <div className="flex flex-wrap gap-2">
            {repository.language && (
              <Badge variant="secondary" className="text-xs">
                {repository.language}
              </Badge>
            )}
            {repository.topics?.slice(0, 3).map((topic) => (
              <Badge key={topic} variant="outline" className="text-xs">
                {topic}
              </Badge>
            ))}
            {repository.topics && repository.topics.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{repository.topics.length - 3} more
              </Badge>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3" />
              <span>{repository.stargazers_count}</span>
            </div>
            <div className="flex items-center gap-1">
              <GitFork className="w-3 h-3" />
              <span>{repository.forks_count}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{repository.watchers_count}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>Updated {timeAgo}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
