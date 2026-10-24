import React, { useState } from 'react';
import { Book, Star, GitFork, ExternalLink } from 'lucide-react';
import { GitHubRepo } from '../utils/githubData';

interface PinnedReposProps {
  repos: GitHubRepo[];
  userLogin: string;
}

export const PinnedRepos: React.FC<PinnedReposProps> = ({ repos, userLogin }) => {
  const [starredMap, setStarredMap] = useState<Record<string, boolean>>({});
  const [starCountMap, setStarCountMap] = useState<Record<string, number>>(
    repos.reduce((acc, r) => ({ ...acc, [r.id]: r.stars }), {})
  );

  const toggleStar = (id: string) => {
    const isCurrentlyStarred = !!starredMap[id];
    setStarredMap((prev) => ({ ...prev, [id]: !isCurrentlyStarred }));
    setStarCountMap((prev) => ({
      ...prev,
      [id]: isCurrentlyStarred ? Math.max(0, (prev[id] || 0) - 1) : (prev[id] || 0) + 1,
    }));
  };

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100">Pinned</h3>
        <span className="text-xs text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 cursor-pointer">
          Customize your pins
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {repos.map((repo) => {
          const isStarred = !!starredMap[repo.id];
          const currentStars = starCountMap[repo.id] ?? repo.stars;

          return (
            <div
              key={repo.id}
              className="border border-slate-200 dark:border-slate-800 rounded-md p-4 bg-white dark:bg-[#0d1117] flex flex-col justify-between hover:border-slate-400 dark:hover:border-slate-600 transition-colors shadow-2xs group"
            >
              <div>
                {/* Title and Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <Book size={14} className="text-slate-500 shrink-0" />
                    <a
                      href={`https://github.com/${userLogin}/${repo.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline break-all"
                    >
                      {repo.name}
                    </a>
                  </div>

                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 shrink-0">
                    {repo.isPrivate ? 'Private' : 'Public'}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {repo.description}
                </p>

                {/* Topics */}
                {repo.topics && repo.topics.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {repo.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="text-[10px] bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Meta Row */}
              <div className="mt-4 pt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/60">
                <div className="flex items-center gap-4">
                  {/* Language */}
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: repo.languageColor }}
                    />
                    <span>{repo.language}</span>
                  </div>

                  {/* Stars */}
                  {currentStars > 0 && (
                    <button
                      onClick={() => toggleStar(repo.id)}
                      className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      title={isStarred ? 'Unstar repository' : 'Star repository'}
                    >
                      <Star
                        size={13}
                        className={isStarred ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}
                      />
                      <span>{currentStars}</span>
                    </button>
                  )}

                  {/* Forks */}
                  {repo.forks > 0 && (
                    <div className="flex items-center gap-1">
                      <GitFork size={13} className="text-slate-400" />
                      <span>{repo.forks}</span>
                    </div>
                  )}
                </div>

                {/* Quick Star action button on hover */}
                <button
                  onClick={() => toggleStar(repo.id)}
                  className={`px-2 py-0.5 text-xs rounded border transition-colors flex items-center gap-1 ${
                    isStarred
                      ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-300'
                      : 'bg-slate-50 hover:bg-slate-100 dark:bg-[#21262d] dark:hover:bg-[#30363d] border-slate-300 dark:border-slate-700'
                  }`}
                >
                  <Star size={11} className={isStarred ? 'fill-current' : ''} />
                  <span>{isStarred ? 'Starred' : 'Star'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
