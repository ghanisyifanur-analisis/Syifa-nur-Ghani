import React, { useState } from 'react';
import { Search, ChevronDown, Book, Star, Plus } from 'lucide-react';
import { GitHubRepo } from '../utils/githubData';

interface RepositoriesTabProps {
  repos: GitHubRepo[];
  userLogin: string;
}

export const RepositoriesTab: React.FC<RepositoriesTabProps> = ({ repos, userLogin }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [starredMap, setStarredMap] = useState<Record<string, boolean>>({});

  const toggleStar = (id: string) => {
    setStarredMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredRepos = repos.filter((repo) => {
    const matchesSearch =
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLang = selectedLanguage === 'All' || repo.language === selectedLanguage;
    return matchesSearch && matchesLang;
  });

  const languages = ['All', ...Array.from(new Set(repos.map((r) => r.language)))];

  return (
    <div className="space-y-4">
      {/* Search and Filter toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Find a repository..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white dark:bg-[#161b22] border border-slate-300 dark:border-slate-700 rounded-md py-1.5 pl-8 pr-4 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search size={14} className="absolute left-2.5 top-2 text-slate-400" />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="appearance-none bg-slate-50 dark:bg-[#21262d] border border-slate-300 dark:border-slate-700 rounded-md py-1.5 pl-3 pr-8 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  Language: {lang}
                </option>
              ))}
            </select>
            <ChevronDown size={12} className="absolute right-2.5 top-2.5 text-slate-400 pointer-events-none" />
          </div>

          <button className="flex items-center gap-1.5 bg-[#2da44e] hover:bg-[#2c974b] text-white text-xs font-semibold px-3 py-1.5 rounded-md shadow-sm transition-colors">
            <Plus size={14} />
            <span>New</span>
          </button>
        </div>
      </div>

      {/* List of Repositories */}
      <div className="divide-y divide-slate-200 dark:divide-slate-800">
        {filteredRepos.length === 0 ? (
          <div className="py-12 text-center text-sm text-slate-500">
            No repositories found matching "{searchTerm}"
          </div>
        ) : (
          filteredRepos.map((repo) => {
            const isStarred = !!starredMap[repo.id];
            return (
              <div key={repo.id} className="py-5 flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <Book size={16} className="text-slate-500 shrink-0" />
                    <a
                      href={`https://github.com/${userLogin}/${repo.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline break-all"
                    >
                      {repo.name}
                    </a>
                    <span className="text-xs px-2 py-0.5 rounded-full border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-medium">
                      {repo.isPrivate ? 'Private' : 'Public'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                    {repo.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: repo.languageColor }}
                      />
                      <span>{repo.language}</span>
                    </div>

                    <span>{repo.updatedAt}</span>
                  </div>
                </div>

                {/* Star Button */}
                <button
                  onClick={() => toggleStar(repo.id)}
                  className={`px-3 py-1 text-xs font-semibold rounded-md border flex items-center gap-1.5 transition-colors shrink-0 ${
                    isStarred
                      ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-300'
                      : 'bg-slate-50 hover:bg-slate-100 dark:bg-[#21262d] dark:hover:bg-[#30363d] border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <Star size={13} className={isStarred ? 'fill-current' : ''} />
                  <span>{isStarred ? 'Starred' : 'Star'}</span>
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
