"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useGitHubStore } from "@/lib/store"
import type { GitHubUser } from "@/lib/types"
import { ExternalLink, MapPin, Building, Users } from "lucide-react"

interface UserCardProps {
  user: GitHubUser
}

export function UserCard({ user }: UserCardProps) {
  const { selectedUser, setSelectedUser } = useGitHubStore()
  const isSelected = selectedUser?.id === user.id

  const handleSelect = () => {
    setSelectedUser(user)
  }

  const handleViewProfile = (e: React.MouseEvent) => {
    e.stopPropagation()
    window.open(user.html_url, "_blank", "noopener,noreferrer")
  }

  return (
    <Card
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected
          ? "ring-2 ring-blue-500 dark:ring-blue-400 bg-blue-50 dark:bg-blue-950/20"
          : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
      }`}
      onClick={handleSelect}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="w-12 h-12 border-2 border-slate-200 dark:border-slate-700">
            <AvatarImage src={user.avatar_url || "/placeholder.svg"} alt={user.login} />
            <AvatarFallback>{user.login.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 truncate">{user.login}</h3>
              {user.type === "Organization" && (
                <Badge variant="secondary" className="text-xs">
                  <Building className="w-3 h-3 mr-1" />
                  Org
                </Badge>
              )}
            </div>

            {user.name && <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 truncate">{user.name}</p>}

            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
              {user.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{user.location}</span>
                </div>
              )}
              {user.followers !== undefined && (
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{user.followers} followers</span>
                </div>
              )}
            </div>
          </div>

          <Button variant="ghost" size="sm" onClick={handleViewProfile} className="shrink-0">
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
