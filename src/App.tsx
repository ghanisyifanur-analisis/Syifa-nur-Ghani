/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  BookOpen,
  BookMarked,
  Table,
  Package,
  Star,
  Check,
  CloudUpload,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { PROFILES, GitHubProfile } from './utils/githubData';
import { GitHubNavbar } from './components/GitHubNavbar';
import { ProfileSidebar } from './components/ProfileSidebar';
import { ReadmeCard } from './components/ReadmeCard';
import { PinnedRepos } from './components/PinnedRepos';
import { ContributionGraph } from './components/ContributionGraph';
import { RepositoriesTab } from './components/RepositoriesTab';
import { AiEnhancerModal } from './components/AiEnhancerModal';
import { DeviceSimulatorBar, DeviceMode } from './components/DeviceSimulatorBar';

export default function App() {
  const [profilesState, setProfilesState] = useState<Record<string, GitHubProfile>>(PROFILES);
  const [selectedUser, setSelectedUser] = useState<string>('ghanisyifanur-analisis');
  const [activeTab, setActiveTab] = useState<'overview' | 'repositories' | 'projects' | 'packages' | 'stars'>('overview');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('full');
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [driveNotification, setDriveNotification] = useState<string | null>(null);

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const currentProfile = profilesState[selectedUser] || profilesState['ghanisyifanur-analisis'];

  // Update profile README
  const handleUpdateReadme = (newReadme: GitHubProfile['readme']) => {
    setProfilesState((prev) => ({
      ...prev,
      [selectedUser]: {
        ...prev[selectedUser],
        readme: newReadme,
      },
    }));
  };

  // Apply AI Generated Enhancements
  const handleApplyAi = (enhanced: {
    suggestedBio?: string;
    greeting: string;
    interestedIn: string;
    learning: string;
    collaborating: string;
    reachingOut: string;
    techStack?: string[];
  }) => {
    setProfilesState((prev) => ({
      ...prev,
      [selectedUser]: {
        ...prev[selectedUser],
        bio: enhanced.suggestedBio || prev[selectedUser].bio,
        readme: {
          ...prev[selectedUser].readme,
          greeting: enhanced.greeting,
          interestedIn: enhanced.interestedIn,
          learning: enhanced.learning,
          collaborating: enhanced.collaborating,
          reachingOut: enhanced.reachingOut,
          techStack: enhanced.techStack || prev[selectedUser].readme.techStack,
        },
      },
    }));
    setDriveNotification('Profile & README updated with AI High Thinking enhancements!');
    setTimeout(() => setDriveNotification(null), 4000);
  };

  // Google Drive Export Handler (Workspace Skill compliant)
  const handleExportDrive = () => {
    const confirmed = window.confirm(
      `Do you want to save and export "${currentProfile.login}/README.md" and profile configuration to your Google Drive?`
    );
    if (!confirmed) return;

    // Trigger local download backup and simulated cloud sync
    const content = `# GitHub Profile: ${currentProfile.name} (@${currentProfile.login})\n\n${currentProfile.readme.greeting}\n\n- 👀 Interested in: ${currentProfile.readme.interestedIn}\n- 🌱 Currently learning: ${currentProfile.readme.learning}\n- 💞️ Looking to collaborate on: ${currentProfile.readme.collaborating}\n- 📫 How to reach me: ${currentProfile.readme.reachingOut}\n\nStats: ${currentProfile.readme.statsImage}`;
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentProfile.login}-github-profile-backup.md`;
    a.click();
    URL.revokeObjectURL(url);

    setDriveNotification(`Successfully exported "${currentProfile.login}-github-profile-backup.md" for Google Drive sync!`);
    setTimeout(() => setDriveNotification(null), 4500);
  };

  // Container styling based on device simulation mode
  const getDeviceContainerClass = () => {
    switch (deviceMode) {
      case 'desktop':
        return 'max-w-[1440px] mx-auto shadow-2xl border-x border-slate-300 dark:border-slate-800 transition-all';
      case 'tablet':
        return 'max-w-[768px] mx-auto my-6 shadow-2xl border-4 border-slate-700 rounded-2xl overflow-hidden transition-all';
      case 'mobile':
        return 'max-w-[390px] mx-auto my-6 shadow-2xl border-8 border-slate-800 rounded-3xl overflow-hidden transition-all';
      default:
        return 'w-full transition-all';
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-[#0d1117] text-slate-100' : 'bg-white text-slate-900'} font-sans antialiased`}>
      {/* GitHub Top Global Navigation */}
      <GitHubNavbar
        currentProfile={currentProfile}
        allProfiles={profilesState}
        onSelectProfile={(login) => setSelectedUser(login)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onOpenAiModal={() => setIsAiModalOpen(true)}
        onExportDrive={handleExportDrive}
      />

      {/* Responsive Viewport Simulator Bar */}
      <DeviceSimulatorBar
        deviceMode={deviceMode}
        onChangeDeviceMode={(mode) => setDeviceMode(mode)}
      />

      {/* Floating Notification Toast */}
      {driveNotification && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2 border border-slate-700 animate-in slide-in-from-bottom-3 duration-300">
          <Check size={14} className="text-emerald-400" />
          <span>{driveNotification}</span>
        </div>
      )}

      {/* App Body Frame Wrapper */}
      <div className={getDeviceContainerClass()}>
        {/* Profile Tabs Navigation (Under Navbar, Sticky on scroll) */}
        <nav
          className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1117] px-4 sm:px-6 sticky top-[85px] z-20"
          aria-label="User profile navigation tabs"
        >
          <div className="max-w-[1280px] mx-auto flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar md:pl-[312px]">
            {/* Overview Tab */}
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'border-[#fd8c73] text-slate-900 dark:text-white font-bold'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <BookOpen size={16} className="text-slate-500" />
              <span>Overview</span>
            </button>

            {/* Repositories Tab */}
            <button
              onClick={() => setActiveTab('repositories')}
              className={`flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'repositories'
                  ? 'border-[#fd8c73] text-slate-900 dark:text-white font-bold'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <BookMarked size={16} className="text-slate-500" />
              <span>Repositories</span>
              <span className="text-xs bg-slate-100 dark:bg-[#21262d] text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded-full font-medium">
                {currentProfile.public_repos}
              </span>
            </button>

            {/* Projects Tab */}
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'projects'
                  ? 'border-[#fd8c73] text-slate-900 dark:text-white font-bold'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Table size={16} className="text-slate-500" />
              <span>Projects</span>
            </button>

            {/* Packages Tab */}
            <button
              onClick={() => setActiveTab('packages')}
              className={`flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'packages'
                  ? 'border-[#fd8c73] text-slate-900 dark:text-white font-bold'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Package size={16} className="text-slate-500" />
              <span>Packages</span>
            </button>

            {/* Stars Tab */}
            <button
              onClick={() => setActiveTab('stars')}
              className={`flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'stars'
                  ? 'border-[#fd8c73] text-slate-900 dark:text-white font-bold'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Star size={16} className="text-slate-500" />
              <span>Stars</span>
            </button>
          </div>
        </nav>

        {/* Main Content Area: Sidebar + Body */}
        <main className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6 md:py-8">
          <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
            {/* Left Sidebar Profile Column */}
            <ProfileSidebar
              profile={currentProfile}
              isDarkMode={isDarkMode}
            />

            {/* Right Main Profile Content */}
            <section className="flex-1 w-full space-y-6">
              {activeTab === 'overview' && (
                <>
                  {/* Profile README card matching maoneart */}
                  <ReadmeCard
                    profile={currentProfile}
                    isDarkMode={isDarkMode}
                    onOpenAiModal={() => setIsAiModalOpen(true)}
                    onExportDrive={handleExportDrive}
                    onUpdateReadme={handleUpdateReadme}
                  />

                  {/* Pinned Repositories */}
                  <PinnedRepos
                    repos={currentProfile.pinnedRepos}
                    userLogin={currentProfile.login}
                  />

                  {/* 52-Week Contribution Heatmap Calendar */}
                  <ContributionGraph
                    totalContributions={currentProfile.totalContributions}
                    isDarkMode={isDarkMode}
                    username={currentProfile.login}
                  />
                </>
              )}

              {activeTab === 'repositories' && (
                <RepositoriesTab
                  repos={currentProfile.pinnedRepos}
                  userLogin={currentProfile.login}
                />
              )}

              {activeTab === 'projects' && (
                <div className="border border-slate-200 dark:border-slate-800 rounded-md p-10 text-center space-y-3 bg-white dark:bg-[#0d1117]">
                  <Table size={32} className="mx-auto text-slate-400" />
                  <h3 className="font-semibold text-base text-slate-900 dark:text-slate-100">
                    No active public projects
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    Projects are a customizable, flexible tool for planning and tracking work on GitHub.
                  </p>
                </div>
              )}

              {activeTab === 'packages' && (
                <div className="border border-slate-200 dark:border-slate-800 rounded-md p-10 text-center space-y-3 bg-white dark:bg-[#0d1117]">
                  <Package size={32} className="mx-auto text-slate-400" />
                  <h3 className="font-semibold text-base text-slate-900 dark:text-slate-100">
                    Get started with GitHub Packages
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    Safely publish packages alongside your code. Supports npm, Docker, Maven, NuGet, and RubyGems.
                  </p>
                </div>
              )}

              {activeTab === 'stars' && (
                <div className="border border-slate-200 dark:border-slate-800 rounded-md p-10 text-center space-y-3 bg-white dark:bg-[#0d1117]">
                  <Star size={32} className="mx-auto text-slate-400" />
                  <h3 className="font-semibold text-base text-slate-900 dark:text-slate-100">
                    Starred repositories
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    You haven’t starred any repositories yet. Use stars to mark and organize interesting projects.
                  </p>
                </div>
              )}
            </section>
          </div>
        </main>

        {/* GitHub Authentic Footer */}
        <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 py-8 px-4 text-[11px] text-slate-500 dark:text-slate-400">
          <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <svg height="24" viewBox="0 0 16 16" width="24" className="fill-current text-slate-400">
                <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
              </svg>
              <span>© 2026 GitHub, Inc. Replica by Ghani Syifa Nur</span>
            </div>

            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
              <a href="https://docs.github.com/site-policy/github-terms/github-terms-of-service" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 hover:underline">
                Terms
              </a>
              <a href="https://docs.github.com/site-policy/privacy-policies/github-privacy-statement" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 hover:underline">
                Privacy
              </a>
              <a href="https://github.com/security" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 hover:underline">
                Security
              </a>
              <a href="https://www.githubstatus.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 hover:underline">
                Status
              </a>
              <a href="https://docs.github.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 hover:underline">
                Docs
              </a>
              <a href="https://support.github.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 hover:underline">
                Contact
              </a>
              <a href="https://github.com/ghanisyifanur-analisis" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1">
                <span>@ghanisyifanur-analisis</span>
                <ExternalLink size={10} />
              </a>
              <a href="https://github.com/maoneart" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1">
                <span>@maoneart</span>
                <ExternalLink size={10} />
              </a>
            </div>
          </div>
        </footer>
      </div>

      {/* AI Profile Architect & High Thinking Modal */}
      <AiEnhancerModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        profile={currentProfile}
        onApplyEnhancements={handleApplyAi}
      />
    </div>
  );
}
