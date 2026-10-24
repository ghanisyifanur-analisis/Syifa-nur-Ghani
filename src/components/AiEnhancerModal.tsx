import React, { useState } from 'react';
import { X, Sparkles, Brain, Check, RefreshCw, ArrowRight, Wand2 } from 'lucide-react';
import { GitHubProfile } from '../utils/githubData';

interface AiEnhancerModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: GitHubProfile;
  onApplyEnhancements: (enhanced: {
    suggestedBio?: string;
    greeting: string;
    interestedIn: string;
    learning: string;
    collaborating: string;
    reachingOut: string;
    techStack?: string[];
  }) => void;
}

export const AiEnhancerModal: React.FC<AiEnhancerModalProps> = ({
  isOpen,
  onClose,
  profile,
  onApplyEnhancements,
}) => {
  const [roleTarget, setRoleTarget] = useState('Full Stack Web & Mobile Flutter Developer | System Analyst');
  const [techFocus, setTechFocus] = useState('Laravel, Flutter, Dart, PHP, TypeScript, React, Docker, REST APIs');
  const [stylePreset, setStylePreset] = useState('maoneart-aesthetic');
  const [isLoading, setIsLoading] = useState(false);
  const [thinkingStep, setThinkingStep] = useState<string>('');
  const [result, setResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    setThinkingStep('Activating High Thinking reasoning with gemini-4-argon...');

    try {
      const stepTimer1 = setTimeout(() => {
        setThinkingStep('Analyzing GitHub developer achievements and skills architecture...');
      }, 700);

      const stepTimer2 = setTimeout(() => {
        setThinkingStep('Synthesizing structured Markdown with @maoneart alignment...');
      }, 1500);

      const response = await fetch('/api/ai/enhance-readme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileName: profile.login,
          currentBio: profile.bio,
          focusAreas: roleTarget,
          techStack: techFocus,
          style: stylePreset,
        }),
      });

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);

      const data = await response.json();
      if (data.success && data.enhancedReadme) {
        setResult(data.enhancedReadme);
      } else {
        throw new Error(data.error || 'Failed to generate profile enhancements');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
      setThinkingStep('');
    }
  };

  const handleApply = () => {
    if (!result) return;
    onApplyEnhancements({
      suggestedBio: result.suggestedBio,
      greeting: result.greeting,
      interestedIn: result.interestedIn,
      learning: result.learning,
      collaborating: result.collaborating,
      reachingOut: result.reachingOut,
      techStack: result.techStack,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0d1117] border border-slate-300 dark:border-slate-700 w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-purple-500/20 border border-purple-400/30 rounded-lg">
              <Brain className="w-5 h-5 text-purple-300" />
            </div>
            <div>
              <h2 className="text-base font-bold flex items-center gap-2">
                AI Profile Architect
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-purple-500/30 text-purple-200 border border-purple-400/30">
                  Thinking Mode: High
                </span>
              </h2>
              <p className="text-xs text-purple-200/80">
                Craft an authentic, high-impact GitHub Profile modeled after @maoneart
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-purple-200 hover:text-white p-1 rounded-md transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Form */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-md text-xs text-rose-700 dark:text-rose-300">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Target Specialization / Role
              </label>
              <input
                type="text"
                value={roleTarget}
                onChange={(e) => setRoleTarget(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 dark:bg-[#161b22] border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-slate-100"
                placeholder="e.g. Full Stack Developer, Flutter Engineer"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Key Tech Stack & Tools
              </label>
              <input
                type="text"
                value={techFocus}
                onChange={(e) => setTechFocus(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 dark:bg-[#161b22] border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-slate-100"
                placeholder="Laravel, Flutter, Dart, TypeScript, Docker"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Design Aesthetic Preset
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'maoneart-aesthetic', label: 'MaoneArt Exact Replica', desc: 'Indonesian tech stack focus' },
                { id: 'senior-fullstack', label: 'Enterprise Senior Dev', desc: 'Architecture & cloud oriented' },
                { id: 'innovative-creator', label: 'Creative Tech & Mobile', desc: 'Flutter & open source highlight' },
              ].map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setStylePreset(preset.id)}
                  className={`text-left p-2.5 rounded-lg border text-xs transition-all ${
                    stylePreset === preset.id
                      ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/30 text-purple-900 dark:text-purple-200'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold">{preset.label}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{preset.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Action Trigger */}
          <div className="pt-2">
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold text-xs py-2.5 px-4 rounded-lg shadow-md transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-purple-200" />
                  <span>{thinkingStep || 'Thinking deeply with Gemini 4 Argon...'}</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 text-amber-300" />
                  <span>Synthesize AI Profile & README</span>
                </>
              )}
            </button>
          </div>

          {/* Generated Result Preview */}
          {result && (
            <div className="mt-4 p-4 rounded-lg border border-purple-200 dark:border-purple-900 bg-purple-50/50 dark:bg-purple-950/20 space-y-3 animate-in fade-in duration-300 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-purple-200 dark:border-purple-900">
                <span className="font-bold text-purple-900 dark:text-purple-200 flex items-center gap-1.5">
                  <Check size={14} className="text-emerald-500" />
                  Generated README & Profile Copy
                </span>
                <span className="text-[10px] text-purple-600 dark:text-purple-400">Ready to apply</span>
              </div>

              {result.suggestedBio && (
                <div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Suggested Sidebar Bio:</span>
                  <div className="mt-0.5 p-2 bg-white dark:bg-[#161b22] border border-slate-200 dark:border-slate-800 rounded text-slate-800 dark:text-slate-200">
                    {result.suggestedBio}
                  </div>
                </div>
              )}

              <div className="space-y-1.5 text-slate-800 dark:text-slate-200">
                <div>
                  <strong>Greeting: </strong> {result.greeting}
                </div>
                <div>
                  <strong>👀 Interested in: </strong> {result.interestedIn}
                </div>
                <div>
                  <strong>🌱 Currently learning: </strong> {result.learning}
                </div>
                <div>
                  <strong>💞️ Looking to collaborate on: </strong> {result.collaborating}
                </div>
                <div>
                  <strong>📫 How to reach me: </strong> {result.reachingOut}
                </div>
              </div>

              {result.techStack && (
                <div className="pt-2">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Recommended Badges:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {result.techStack.map((t: string) => (
                      <span
                        key={t}
                        className="text-[10px] bg-white dark:bg-[#161b22] px-2 py-0.5 rounded border border-slate-300 dark:border-slate-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={onClose}
                  className="px-3 py-1.5 border border-slate-300 dark:border-slate-700 rounded text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApply}
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded shadow-sm flex items-center gap-1.5"
                >
                  <Check size={14} />
                  <span>Apply to Live Profile</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
