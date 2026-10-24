import React, { useState } from 'react';
import { ChevronDown, GitCommit, GitPullRequest, GitMerge, FolderPlus } from 'lucide-react';
import { ContributionWeek, generateContributionWeeks } from '../utils/githubData';

interface ContributionGraphProps {
  totalContributions: number;
  isDarkMode: boolean;
  username: string;
}

export const ContributionGraph: React.FC<ContributionGraphProps> = ({
  totalContributions,
  isDarkMode,
  username,
}) => {
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [hoveredDay, setHoveredDay] = useState<{
    date: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  // Generate 52 weeks based on selected year
  const weeks: ContributionWeek[] = React.useMemo(() => {
    return generateContributionWeeks(selectedYear * 17);
  }, [selectedYear]);

  // Color scheme matching GitHub standard
  const getLevelColor = (level: number) => {
    if (isDarkMode) {
      switch (level) {
        case 1:
          return 'bg-[#0e4429] border-[#006d32]';
        case 2:
          return 'bg-[#006d32] border-[#26a641]';
        case 3:
          return 'bg-[#26a641] border-[#39d353]';
        case 4:
          return 'bg-[#39d353] border-[#39d353]';
        default:
          return 'bg-[#161b22] border-transparent';
      }
    } else {
      switch (level) {
        case 1:
          return 'bg-[#9be9a8] border-[#40c463]';
        case 2:
          return 'bg-[#40c463] border-[#30a14e]';
        case 3:
          return 'bg-[#30a14e] border-[#216e39]';
        case 4:
          return 'bg-[#216e39] border-[#1b5e20]';
        default:
          return 'bg-[#ebedf0] border-transparent';
      }
    }
  };

  const months = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
  const years = [2026, 2025, 2024, 2023, 2022];

  return (
    <section className="space-y-4">
      {/* Header and Year selector row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          {totalContributions} contributions in {selectedYear === 2026 ? 'the last year' : selectedYear}
        </h3>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700 dark:hover:text-slate-300">
            <span>Contribution settings</span>
            <ChevronDown size={12} />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-start">
        {/* Heatmap Box */}
        <div className="flex-1 w-full border border-slate-200 dark:border-slate-800 rounded-md p-4 bg-white dark:bg-[#0d1117] shadow-2xs overflow-x-auto relative">
          {/* Months Header Labels */}
          <div className="min-w-[720px]">
            <div className="flex text-[10px] text-slate-500 dark:text-slate-400 mb-1.5 pl-7 justify-between pr-2">
              {months.map((m, idx) => (
                <span key={idx} className="w-12 text-left">
                  {m}
                </span>
              ))}
            </div>

            {/* Grid with Day of week labels */}
            <div className="flex gap-2">
              {/* Day labels (Mon, Wed, Fri) */}
              <div className="flex flex-col justify-between text-[9px] text-slate-400 h-[88px] py-0.5 select-none shrink-0 w-5">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div>

              {/* 52 Columns of 7 Days */}
              <div className="flex gap-[3px] flex-1">
                {weeks.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-[3px]">
                    {week.days.map((day, dIdx) => (
                      <div
                        key={dIdx}
                        className={`w-[10px] h-[10px] rounded-[2px] cursor-pointer transition-all hover:ring-2 hover:ring-blue-500 ${getLevelColor(
                          day.level
                        )}`}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHoveredDay({
                            date: day.date,
                            count: day.count,
                            x: rect.left + rect.width / 2,
                            y: rect.top,
                          });
                        }}
                        onMouseLeave={() => setHoveredDay(null)}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Footer: Info link & Color Legend */}
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <a
                href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                Learn how we count contributions
              </a>

              <div className="flex items-center gap-1.5">
                <span>Less</span>
                <span className={`w-[10px] h-[10px] rounded-[2px] ${getLevelColor(0)}`} />
                <span className={`w-[10px] h-[10px] rounded-[2px] ${getLevelColor(1)}`} />
                <span className={`w-[10px] h-[10px] rounded-[2px] ${getLevelColor(2)}`} />
                <span className={`w-[10px] h-[10px] rounded-[2px] ${getLevelColor(3)}`} />
                <span className={`w-[10px] h-[10px] rounded-[2px] ${getLevelColor(4)}`} />
                <span>More</span>
              </div>
            </div>
          </div>
        </div>

        {/* Year Pills Navigation on the right */}
        <div className="flex lg:flex-col gap-1 w-full lg:w-28 shrink-0 overflow-x-auto pb-1 lg:pb-0">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold text-left transition-colors whitespace-nowrap ${
                selectedYear === year
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#21262d]'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* Hover Floating Tooltip */}
      {hoveredDay && (
        <div
          className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-2 px-2.5 py-1.5 bg-slate-900 text-white text-[11px] rounded shadow-lg whitespace-nowrap"
          style={{ left: `${hoveredDay.x}px`, top: `${hoveredDay.y - 6}px` }}
        >
          <span className="font-semibold">{hoveredDay.count} contributions</span> on{' '}
          {new Date(hoveredDay.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </div>
      )}

      {/* Contribution Activity Timeline */}
      <div className="mt-8 space-y-4">
        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-200 dark:border-slate-800">
          Contribution activity
        </h4>

        <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200 dark:before:bg-slate-800">
          {/* Timeline Item 1 */}
          <div className="relative">
            <span className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-blue-500 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            </span>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
              October 2026
            </div>
            <div className="bg-slate-50 dark:bg-[#161b22] border border-slate-200 dark:border-slate-800 rounded p-3 text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-800 dark:text-slate-200 font-medium">
                <span className="flex items-center gap-1.5">
                  <GitCommit size={14} className="text-emerald-500" />
                  Created 12 commits in 2 repositories
                </span>
                <span className="text-[10px] text-slate-400">Oct 21</span>
              </div>
              <div className="pl-5 text-slate-600 dark:text-slate-400 space-y-1">
                <div>• {username}/ghani-jasa-secsion: 8 commits</div>
                <div>• {username}/{username}: 4 commits</div>
              </div>
            </div>
          </div>

          {/* Timeline Item 2 */}
          <div className="relative">
            <span className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-400 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            </span>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
              September 2026
            </div>
            <div className="bg-slate-50 dark:bg-[#161b22] border border-slate-200 dark:border-slate-800 rounded p-3 text-xs flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-medium">
                <FolderPlus size={14} className="text-blue-500" />
                Created public repository {username}/flutter-agro-analytics
              </span>
              <span className="text-[10px] text-slate-400">Sep 15</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
