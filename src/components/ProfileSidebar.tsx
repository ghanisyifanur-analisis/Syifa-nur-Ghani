import React, { useState } from 'react';
import { Users, Building, MapPin, Link as LinkIcon, Mail, Smile, Check, ShieldAlert } from 'lucide-react';
import { GitHubProfile } from '../utils/githubData';

interface ProfileSidebarProps {
  profile: GitHubProfile;
  isDarkMode: boolean;
  onUpdateBio?: (newBio: string) => void;
}

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  profile,
  isDarkMode,
}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(profile.followers);
  const [showStatusTooltip, setShowStatusTooltip] = useState(false);

  const handleFollowToggle = () => {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowersCount((prev) => Math.max(0, prev - 1));
    } else {
      setIsFollowing(true);
      setFollowersCount((prev) => prev + 1);
    }
  };

  return (
    <aside className="w-full md:w-[296px] shrink-0">
      {/* Mobile Top Header vs Desktop Avatar Column */}
      <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-0">
        {/* Avatar with Status badge */}
        <div className="relative group shrink-0">
          <img
            src={profile.avatar_url}
            alt={profile.name}
            className="w-20 h-20 sm:w-28 sm:h-28 md:w-[296px] md:h-[296px] rounded-full object-cover border border-slate-300 dark:border-slate-700 shadow-sm transition-transform duration-200"
          />
          {/* Status badge: 🏠 */}
          <div
            className="absolute bottom-1 right-1 md:bottom-6 md:right-3 bg-white dark:bg-[#161b22] border border-slate-300 dark:border-slate-700 rounded-full p-1.5 md:p-2 shadow-md cursor-pointer hover:scale-110 transition-transform"
            onMouseEnter={() => setShowStatusTooltip(true)}
            onMouseLeave={() => setShowStatusTooltip(false)}
            onClick={() => setShowStatusTooltip(!showStatusTooltip)}
            title={profile.statusText}
          >
            <span className="text-sm md:text-base leading-none block">{profile.statusEmoji}</span>
          </div>

          {showStatusTooltip && (
            <div className="absolute bottom-12 right-0 md:bottom-16 md:left-1/2 md:-translate-x-1/2 bg-slate-900 text-white text-xs py-1 px-2.5 rounded shadow-lg whitespace-nowrap z-30">
              {profile.statusEmoji} {profile.statusText}
            </div>
          )}
        </div>

        {/* Name and Username */}
        <div className="md:mt-4 flex-1">
          <h1 className="text-2xl md:text-[26px] font-bold text-slate-900 dark:text-slate-100 leading-tight">
            {profile.name}
          </h1>
          <h2 className="text-lg md:text-xl font-light text-slate-500 dark:text-slate-400">
            {profile.login}
          </h2>
        </div>
      </div>

      {/* Follow Button */}
      <div className="mt-4">
        <button
          onClick={handleFollowToggle}
          className={`w-full py-1.5 px-4 text-sm font-semibold rounded-md border transition-all flex items-center justify-center gap-1.5 shadow-sm ${
            isFollowing
              ? 'bg-slate-100 hover:bg-rose-50 text-slate-800 hover:text-rose-600 border-slate-300 hover:border-rose-300 dark:bg-[#21262d] dark:hover:bg-rose-950/40 dark:text-slate-200 dark:hover:text-rose-400 dark:border-slate-700'
              : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-300 dark:bg-[#21262d] dark:hover:bg-[#30363d] dark:text-slate-200 dark:border-slate-700'
          }`}
          aria-label={isFollowing ? 'Unfollow user' : 'Follow user'}
        >
          {isFollowing ? (
            <>
              <Check size={14} className="text-emerald-500" />
              <span>Following</span>
            </>
          ) : (
            <span>Follow</span>
          )}
        </button>
      </div>

      {/* Bio */}
      {profile.bio && (
        <div className="mt-4 text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
          {profile.bio}
        </div>
      )}

      {/* Followers & Following */}
      <div className="mt-4 flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400">
        <Users size={14} className="text-slate-500 dark:text-slate-400" />
        <span className="font-semibold text-slate-900 dark:text-slate-100">{followersCount}</span>
        <span>{followersCount === 1 ? 'follower' : 'followers'}</span>
        <span className="mx-0.5">·</span>
        <span className="font-semibold text-slate-900 dark:text-slate-100">{profile.following}</span>
        <span>following</span>
      </div>

      {/* Meta details list: Company, Location, Blog, Email */}
      <div className="mt-4 space-y-2 text-xs text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800 pt-4">
        {profile.company && (
          <div className="flex items-center gap-2">
            <Building size={14} className="text-slate-400 shrink-0" />
            <span className="truncate">{profile.company}</span>
          </div>
        )}

        {profile.location && (
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-slate-400 shrink-0" />
            <span className="truncate">{profile.location}</span>
          </div>
        )}

        {profile.blog && (
          <div className="flex items-center gap-2">
            <LinkIcon size={14} className="text-slate-400 shrink-0" />
            <a
              href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline truncate"
            >
              {profile.blog.replace(/^https?:\/\//, '')}
            </a>
          </div>
        )}

        {profile.email && (
          <div className="flex items-center gap-2">
            <Mail size={14} className="text-slate-400 shrink-0" />
            <a
              href={`mailto:${profile.email}`}
              className="text-blue-600 dark:text-blue-400 hover:underline truncate"
            >
              {profile.email}
            </a>
          </div>
        )}
      </div>

      {/* Block or report user link */}
      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={() => alert(`Reported user @${profile.login}`)}
          className="text-xs text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 flex items-center gap-1.5 transition-colors"
        >
          <ShieldAlert size={13} />
          <span>Block or report user</span>
        </button>
      </div>
    </aside>
  );
};
