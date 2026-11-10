/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  BrainCircuit,
  Trophy,
  ArrowRight,
  TrendingUp,
  FlaskConical,
  Workflow,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface DataScienceSpotlightCardProps {
  onOpenLab: () => void;
  isDarkMode: boolean;
}

export const DataScienceSpotlightCard: React.FC<DataScienceSpotlightCardProps> = ({
  onOpenLab,
  isDarkMode,
}) => {
  return (
    <article className="border border-indigo-200 dark:border-indigo-900/60 rounded-xl bg-gradient-to-br from-indigo-50/60 via-white to-blue-50/40 dark:from-[#0d1117] dark:via-[#161b22] dark:to-indigo-950/20 p-5 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-lg shadow-sm">
            <BrainCircuit size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                Senior Data Science & Machine Learning Lab
              </h3>
              <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-700">
                LIVE
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Interactive predictive modeling, XAI (SHAP), A/B testing power analysis, and MLOps telemetry.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenLab}
            className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-sm transition-all"
          >
            <span>Launch Workbench</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
        <div
          onClick={onOpenLab}
          className="cursor-pointer p-3 rounded-lg bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all space-y-1"
        >
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
            <span>Model Registry</span>
            <Trophy size={13} className="text-amber-500" />
          </div>
          <div className="text-xs font-bold text-slate-900 dark:text-slate-100 font-mono">
            ROC-AUC 0.946
          </div>
          <p className="text-[10px] text-slate-500">Sub-15ms Triton inference latency</p>
        </div>

        <div
          onClick={onOpenLab}
          className="cursor-pointer p-3 rounded-lg bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all space-y-1"
        >
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
            <span>Explainable AI (XAI)</span>
            <TrendingUp size={13} className="text-purple-500" />
          </div>
          <div className="text-xs font-bold text-slate-900 dark:text-slate-100 font-mono">
            SHAP Waterfall
          </div>
          <p className="text-[10px] text-slate-500">Real-time what-if attribution</p>
        </div>

        <div
          onClick={onOpenLab}
          className="cursor-pointer p-3 rounded-lg bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all space-y-1"
        >
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
            <span>A/B Experimentation</span>
            <FlaskConical size={13} className="text-emerald-500" />
          </div>
          <div className="text-xs font-bold text-slate-900 dark:text-slate-100 font-mono">
            p-Value & Power
          </div>
          <p className="text-[10px] text-slate-500">Sample size & CUPED estimation</p>
        </div>

        <div
          onClick={onOpenLab}
          className="cursor-pointer p-3 rounded-lg bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all space-y-1"
        >
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
            <span>MLOps Telemetry</span>
            <Workflow size={13} className="text-blue-500" />
          </div>
          <div className="text-xs font-bold text-slate-900 dark:text-slate-100 font-mono">
            PSI Drift 0.048
          </div>
          <p className="text-[10px] text-slate-500">Automated retraining triggers</p>
        </div>
      </div>

      {/* Portfolio reference link */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-indigo-100 dark:border-slate-800/80 pt-3">
        <span className="flex items-center gap-1.5">
          <Sparkles size={13} className="text-purple-500" />
          <span>Curated for Senior Data Scientist evaluations & technical interviews</span>
        </span>
        <a
          href="https://rizqighaniadinata.my.id"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-medium"
        >
          <span>rizqighaniadinata.my.id</span>
          <ExternalLink size={11} />
        </a>
      </div>
    </article>
  );
};
