import React, { useState } from 'react';
import { Search, Bell, Plus, Menu, X, Sun, Moon, Laptop, Sparkles, Check, ExternalLink } from 'lucide-react';
import { GitHubProfile } from '../utils/githubData';

interface GitHubNavbarProps {
  currentProfile: GitHubProfile;
  allProfiles: Record<string, GitHubProfile>;
  onSelectProfile: (login: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenAiModal: () => void;
  onExportDrive: () => void;
}

export const GitHubNavbar: React.FC<GitHubNavbarProps> = ({
  currentProfile,
  allProfiles,
  onSelectProfile,
  isDarkMode,
  onToggleDarkMode,
  onOpenAiModal,
  onExportDrive,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <header className="bg-[#24292f] text-white sticky top-0 z-40 border-b border-[#30363d] px-4 py-2.5 sm:px-6">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Octocat Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white p-1 rounded focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:opacity-85 transition-opacity flex items-center gap-2"
            title="GitHub"
          >
            <svg
              height="32"
              aria-hidden="true"
              viewBox="0 0 16 16"
              version="1.1"
              width="32"
              className="fill-current text-white"
            >
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
            </svg>
            <span className="font-semibold text-sm hidden lg:inline tracking-tight text-gray-200">
              GitHub Profile Replica
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-4 text-sm font-semibold text-gray-300 ml-2">
            <span className="hover:text-white cursor-pointer transition-colors">Platform</span>
            <span className="hover:text-white cursor-pointer transition-colors">Solutions</span>
            <span className="hover:text-white cursor-pointer transition-colors">Resources</span>
            <span className="hover:text-white cursor-pointer transition-colors">Open Source</span>
            <span className="hover:text-white cursor-pointer transition-colors">Enterprise</span>
            <span className="hover:text-white cursor-pointer transition-colors">Pricing</span>
          </nav>
        </div>

        {/* Center/Search Bar */}
        <div className="flex-1 max-w-md hidden sm:block">
          <div className="relative">
            <input
              type="text"
              readOnly
              value={`Type '/' to search or jump to...`}
              className="w-full bg-[#161b22] text-xs text-gray-400 border border-[#30363d] rounded-md py-1.5 pl-8 pr-12 focus:outline-none cursor-default"
            />
            <Search className="absolute left-2.5 top-2 text-gray-400 w-3.5 h-3.5" />
            <span className="absolute right-2.5 top-1.5 text-[10px] text-gray-400 border border-[#30363d] px-1.5 py-0.5 rounded bg-[#21262d]">
              /
            </span>
          </div>
        </div>

        {/* Right Action Tools: Switch Profile, AI Thinking Mode, Dark Mode, Avatar */}
        <div className="flex items-center gap-2.5">
          {/* Profile Switcher dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-1.5 bg-[#161b22] hover:bg-[#30363d] border border-[#30363d] text-xs font-medium text-gray-200 px-2.5 py-1.5 rounded-md transition-colors"
              title="Switch user profile"
            >
              <span className="text-gray-400">User:</span>
              <span className="text-emerald-400 font-semibold truncate max-w-[120px]">
                @{currentProfile.login}
              </span>
              <span className="text-[10px] text-gray-400">▼</span>
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-1 w-64 bg-[#161b22] border border-[#30363d] rounded-md shadow-xl py-1 z-50 text-xs">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-gray-400 border-b border-[#30363d]">
                  Switch GitHub View
                </div>
                {Object.values(allProfiles).map((p) => (
                  <button
                    key={p.login}
                    onClick={() => {
                      onSelectProfile(p.login);
                      setProfileDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-[#21262d] transition-colors ${
                      p.login === currentProfile.login ? 'text-emerald-400 font-semibold' : 'text-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <img src={p.avatar_url} alt={p.name} className="w-5 h-5 rounded-full" />
                      <div>
                        <div className="leading-tight">{p.name}</div>
                        <div className="text-[10px] text-gray-400">@{p.login}</div>
                      </div>
                    </div>
                    {p.login === currentProfile.login && <Check size={14} className="text-emerald-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* AI Thinking Generator Button */}
          <button
            onClick={onOpenAiModal}
            className="flex items-center gap-1.5 bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white text-xs font-medium px-2.5 py-1.5 rounded-md shadow-sm transition-all border border-purple-500/30"
            title="Generate AI Profile with High Thinking Mode (Gemini 4 Argon)"
          >
            <Sparkles size={14} className="text-amber-300 animate-pulse" />
            <span className="hidden sm:inline">AI Architect</span>
          </button>

          {/* Google Drive Export/Backup Button */}
          <button
            onClick={onExportDrive}
            className="hidden sm:flex items-center gap-1.5 bg-[#21262d] hover:bg-[#30363d] text-gray-200 text-xs font-medium px-2.5 py-1.5 rounded-md border border-[#30363d] transition-colors"
            title="Google Drive Backup & Export"
          >
            <span className="text-blue-400 font-bold">▲</span>
            <span className="hidden md:inline">Drive Sync</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleDarkMode}
            className="text-gray-300 hover:text-white p-1.5 rounded-md hover:bg-[#30363d] transition-colors"
            title={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} />}
          </button>

          {/* User Avatar */}
          <div className="relative">
            <img
              src={currentProfile.avatar_url}
              alt={currentProfile.name}
              className="w-7 h-7 rounded-full border border-gray-600 object-cover"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border border-[#24292f] rounded-full" />
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-[#30363d] space-y-2 text-sm text-gray-200">
          <div className="py-1 px-2 hover:bg-[#30363d] rounded cursor-pointer">Platform</div>
          <div className="py-1 px-2 hover:bg-[#30363d] rounded cursor-pointer">Solutions</div>
          <div className="py-1 px-2 hover:bg-[#30363d] rounded cursor-pointer">Resources</div>
          <div className="py-1 px-2 hover:bg-[#30363d] rounded cursor-pointer">Open Source</div>
          <div className="py-1 px-2 hover:bg-[#30363d] rounded cursor-pointer">Enterprise</div>
          <div className="py-1 px-2 hover:bg-[#30363d] rounded cursor-pointer">Pricing</div>
          <div className="pt-2 border-t border-[#30363d] flex gap-2">
            <button
              onClick={onOpenAiModal}
              className="flex-1 flex items-center justify-center gap-1.5 bg-purple-700 py-1.5 rounded text-xs font-semibold text-white"
            >
              <Sparkles size={14} /> AI Thinking Architect
            </button>
            <button
              onClick={onExportDrive}
              className="flex-1 flex items-center justify-center gap-1.5 bg-[#30363d] py-1.5 rounded text-xs font-medium text-white"
            >
              ▲ Drive Export
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
