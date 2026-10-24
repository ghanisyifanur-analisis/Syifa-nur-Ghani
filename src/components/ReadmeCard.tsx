import React, { useState } from 'react';
import { BookOpen, Edit2, Copy, Check, Sparkles, Download, CloudUpload } from 'lucide-react';
import { GitHubProfile, buildProfileMarkdown } from '../utils/githubData';

interface ReadmeCardProps {
  profile: GitHubProfile;
  isDarkMode: boolean;
  onOpenAiModal: () => void;
  onExportDrive: () => void;
  onUpdateReadme: (newReadme: GitHubProfile['readme']) => void;
}

export const ReadmeCard: React.FC<ReadmeCardProps> = ({
  profile,
  isDarkMode,
  onOpenAiModal,
  onExportDrive,
  onUpdateReadme,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [editGreeting, setEditGreeting] = useState(profile.readme.greeting);
  const [editInterested, setEditInterested] = useState(profile.readme.interestedIn);
  const [editLearning, setEditLearning] = useState(profile.readme.learning);
  const [editCollaborating, setEditCollaborating] = useState(profile.readme.collaborating);
  const [editReachingOut, setEditReachingOut] = useState(profile.readme.reachingOut);

  // Sync state if profile prop changes
  React.useEffect(() => {
    setEditGreeting(profile.readme.greeting);
    setEditInterested(profile.readme.interestedIn);
    setEditLearning(profile.readme.learning);
    setEditCollaborating(profile.readme.collaborating);
    setEditReachingOut(profile.readme.reachingOut);
  }, [profile.login, profile.readme]);

  const handleCopyMarkdown = async () => {
    const md = buildProfileMarkdown(profile);
    try {
      await navigator.clipboard.writeText(md);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  const handleDownloadMarkdown = () => {
    const md = buildProfileMarkdown(profile);
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'README.md';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveEdit = () => {
    onUpdateReadme({
      ...profile.readme,
      greeting: editGreeting,
      interestedIn: editInterested,
      learning: editLearning,
      collaborating: editCollaborating,
      reachingOut: editReachingOut,
    });
    setIsEditing(false);
  };

  return (
    <article className="border border-slate-200 dark:border-slate-800 rounded-md bg-white dark:bg-[#0d1117] overflow-hidden shadow-sm">
      {/* Top Header Bar */}
      <div className="bg-slate-50 dark:bg-[#161b22] px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-700 dark:text-slate-300">
          <BookOpen size={14} className="text-slate-500" />
          <span>
            {profile.login} <span className="text-slate-400">/</span> README<span className="text-slate-400">.md</span>
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={onOpenAiModal}
            className="flex items-center gap-1 text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/50 px-2 py-1 rounded border border-purple-200 dark:border-purple-800 transition-colors"
            title="Use Gemini 4 Argon High Thinking mode to generate optimized README copy"
          >
            <Sparkles size={12} className="text-purple-500 animate-spin-slow" />
            <span>AI Thinking</span>
          </button>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-1 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 px-2 py-1 rounded transition-colors"
            title={isEditing ? 'Cancel editing' : 'Edit profile README'}
          >
            <Edit2 size={12} />
            <span className="hidden sm:inline">{isEditing ? 'Close' : 'Edit'}</span>
          </button>

          <button
            onClick={handleCopyMarkdown}
            className="flex items-center gap-1 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 px-2 py-1 rounded transition-colors"
            title="Copy Raw Markdown for GitHub"
          >
            {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
            <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="flex items-center gap-1 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 px-2 py-1 rounded transition-colors"
            title="Download README.md"
          >
            <Download size={12} />
            <span className="hidden sm:inline">Export</span>
          </button>

          <button
            onClick={onExportDrive}
            className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 px-2 py-1 rounded border border-blue-200 dark:border-blue-900 transition-colors"
            title="Backup to Google Drive"
          >
            <CloudUpload size={12} />
            <span className="hidden md:inline">Drive</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-5 md:p-7 space-y-6">
        {isEditing ? (
          /* Live Edit Form */
          <div className="space-y-4 bg-slate-50 dark:bg-[#161b22] p-4 rounded-md border border-slate-200 dark:border-slate-800 text-xs">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
              Edit GitHub Profile README
            </h3>

            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">Greeting</label>
              <input
                type="text"
                value={editGreeting}
                onChange={(e) => setEditGreeting(e.target.value)}
                className="w-full p-2 bg-white dark:bg-[#0d1117] border border-slate-300 dark:border-slate-700 rounded text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">👀 Interested In</label>
              <input
                type="text"
                value={editInterested}
                onChange={(e) => setEditInterested(e.target.value)}
                className="w-full p-2 bg-white dark:bg-[#0d1117] border border-slate-300 dark:border-slate-700 rounded text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">🌱 Currently Learning</label>
              <input
                type="text"
                value={editLearning}
                onChange={(e) => setEditLearning(e.target.value)}
                className="w-full p-2 bg-white dark:bg-[#0d1117] border border-slate-300 dark:border-slate-700 rounded text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">💞️ Looking to Collaborate On</label>
              <input
                type="text"
                value={editCollaborating}
                onChange={(e) => setEditCollaborating(e.target.value)}
                className="w-full p-2 bg-white dark:bg-[#0d1117] border border-slate-300 dark:border-slate-700 rounded text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">📫 How to Reach Me</label>
              <input
                type="text"
                value={editReachingOut}
                onChange={(e) => setEditReachingOut(e.target.value)}
                className="w-full p-2 bg-white dark:bg-[#0d1117] border border-slate-300 dark:border-slate-700 rounded text-slate-900 dark:text-slate-100"
              />
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 border border-slate-300 dark:border-slate-700 rounded hover:bg-slate-200 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-medium"
              >
                Save Changes
              </button>
            </div>
          </div>
        ) : (
          /* Rendered Markdown Preview (Identical to maoneart screenshot!) */
          <div className="markdown-body text-slate-800 dark:text-slate-200">
            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 pb-3 border-b border-slate-200 dark:border-slate-800">
              {profile.readme.greeting}
            </h2>

            {/* List with emojis */}
            <ul className="my-5 space-y-2.5 text-sm md:text-base leading-relaxed pl-1">
              <li className="flex items-start gap-2">
                <span className="shrink-0 select-none">👀</span>
                <div>
                  <strong className="font-semibold text-slate-900 dark:text-slate-100">Interested in: </strong>
                  <span className="text-slate-700 dark:text-slate-300">{profile.readme.interestedIn}</span>
                </div>
              </li>

              <li className="flex items-start gap-2">
                <span className="shrink-0 select-none">🌱</span>
                <div>
                  <strong className="font-semibold text-slate-900 dark:text-slate-100">Currently learning: </strong>
                  <span className="text-slate-700 dark:text-slate-300">{profile.readme.learning}</span>
                </div>
              </li>

              <li className="flex items-start gap-2">
                <span className="shrink-0 select-none">💞️</span>
                <div>
                  <strong className="font-semibold text-slate-900 dark:text-slate-100">Looking to collaborate on: </strong>
                  <span className="text-slate-700 dark:text-slate-300">{profile.readme.collaborating}</span>
                </div>
              </li>

              <li className="flex items-start gap-2">
                <span className="shrink-0 select-none">📫</span>
                <div>
                  <strong className="font-semibold text-slate-900 dark:text-slate-100">How to reach me: </strong>
                  <span className="text-blue-600 dark:text-blue-400 hover:underline">{profile.readme.reachingOut}</span>
                </div>
              </li>
            </ul>

            <hr className="my-6 border-slate-200 dark:border-slate-800" />

            {/* GitHub Stats section matching maoneart */}
            <div className="space-y-3">
              <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span>📊</span>
                <span>GitHub Stats</span>
              </h3>

              <div className="overflow-x-auto py-2">
                <a
                  href={`https://github.com/${profile.login}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block transition-transform hover:opacity-95"
                >
                  <img
                    src={profile.readme.statsImage}
                    alt={`${profile.name} Github Stats`}
                    className="max-w-full rounded border border-slate-200 dark:border-slate-800 shadow-sm"
                    loading="lazy"
                  />
                </a>
              </div>
            </div>

            {/* Tech Stack Badges */}
            {profile.readme.techStack && profile.readme.techStack.length > 0 && (
              <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <span>🛠</span>
                  <span>Tech Stack & Tools</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.readme.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-[#161b22] text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 shadow-2xs hover:border-blue-400 transition-colors"
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
};
