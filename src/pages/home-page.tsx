import { useState } from "react";
import { UserSearch } from "@/components/user-search";
import { UserList } from "@/components/user-list";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Github } from "lucide-react";

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Github className="w-8 h-8 text-slate-700 dark:text-slate-300" />
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200">
              GitHub Explorer
            </h1>
            <ThemeSwitcher />
          </div>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Search for GitHub users and explore their repositories. Discover
            amazing projects and developers.
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-8">
          <UserSearch onSearch={setSearchQuery} />
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
            {searchQuery
              ? `Users matching "${searchQuery}"`
              : "Search for users"}
          </h2>
          <div className="space-y-4">
            <UserList query={searchQuery} />
          </div>
        </div>
      </div>
    </div>
  );
}
