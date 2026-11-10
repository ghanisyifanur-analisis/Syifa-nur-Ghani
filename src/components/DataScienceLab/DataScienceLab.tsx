/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Trophy,
  BrainCircuit,
  Database,
  FlaskConical,
  Workflow,
  Code2,
  Sparkles,
  Download,
  Share2,
  Activity,
  Layers,
  Check,
} from 'lucide-react';
import { ModelLeaderboardTab } from './ModelLeaderboardTab';
import { XaiSimulatorTab } from './XaiSimulatorTab';
import { DataProfilingTab } from './DataProfilingTab';
import { AbTestingTab } from './AbTestingTab';
import { MlopsDriftTab } from './MlopsDriftTab';
import { CodeVaultTab } from './CodeVaultTab';
import { AiCopilotTab } from './AiCopilotTab';

export type DsSubTab =
  | 'leaderboard'
  | 'xai'
  | 'profiling'
  | 'abtesting'
  | 'mlops'
  | 'code'
  | 'copilot';

export const DataScienceLab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<DsSubTab>('leaderboard');
  const [exportedToast, setExportedToast] = useState<boolean>(false);

  const handleExportReport = () => {
    const reportContent = `# Senior Data Science & MLOps Executive Portfolio Report
Generated: ${new Date().toISOString()}
Author: Ghani Syifa Nur (Rizqi Ghani Adinata)
Portfolio: https://rizqighaniadinata.my.id
Repository: @ghanisyifanur-analisis

## 1. Production Model Leaderboard & Registry
- Primary Champion: LightGBM Churn Optuna-Tuned (ROC-AUC: 0.942, PR-AUC: 0.898)
- Latency (p95): 11.4 ms via Triton Inference Server
- Challenger Model: XGBoost Histogram Quantized (ROC-AUC: 0.946)
- Covariate Drift Status: Nominal (PSI: 0.048 < 0.10)

## 2. Explainable AI & Feature Attribution
- Core Explainer: TreeSHAP / SHAP Waterfall Formulation
- Primary Feature Weights:
  * Contract Type (Multi-year lock: -0.78 log-odds churn reduction)
  * Account Tenure (-0.42 log-odds retention stabilization)
  * Support Ticket Distress (+0.38 log-odds churn acceleration)

## 3. Causal Experimentation & A/B Testing
- Standard Significance Threshold: alpha = 0.05 (95% Confidence)
- Minimum Statistical Power: beta = 0.80
- Variance Reduction: CUPED pre-experiment covariate adjustments applied

## 4. MLOps Infrastructure
- Feature Store: Feast (Redis online + BigQuery offline)
- Schema Validation: Pandera automated schema gates
- Serving: Triton Inference Server with dynamic ONNX batching
- Drift Telemetry: Population Stability Index (PSI) with automated Airflow retraining DAGs
`;

    const blob = new Blob([reportContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `senior-data-science-executive-report.md`;
    link.click();
    URL.revokeObjectURL(url);

    setExportedToast(true);
    setTimeout(() => setExportedToast(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Toast */}
      {exportedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2 border border-slate-700 animate-in slide-in-from-bottom-3 duration-200">
          <Check size={14} className="text-emerald-400" />
          <span>Executive Senior DS Report exported successfully!</span>
        </div>
      )}

      {/* Top Banner with Stats & Export */}
      <div className="bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                <BrainCircuit size={12} /> Senior Data Science Suite
              </span>
              <span className="text-xs text-slate-500 font-mono">
                Production MLOps & Statistical Inference
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Data Science Lab & Machine Learning Workbench
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              Comprehensive senior data science toolkit featuring real-time model evaluation, SHAP explainability,
              automated data profiling, hypothesis testing calculators, and MLOps drift telemetry.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleExportReport}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-sm transition-colors"
            >
              <Download size={14} />
              <span>Export DS Report</span>
            </button>
            <a
              href="https://rizqighaniadinata.my.id"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 transition-colors"
            >
              <span>Academic Site ↗</span>
            </a>
          </div>
        </div>

        {/* Executive KPI Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-5 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-slate-400">Models in Registry</span>
            <div className="text-base font-bold font-mono text-slate-900 dark:text-slate-100">
              6 Architectures
            </div>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-slate-400">Champion Latency</span>
            <div className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400">
              11.4 ms <span className="text-xs font-normal text-slate-400">p95</span>
            </div>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-slate-400">Peak ROC-AUC</span>
            <div className="text-base font-bold font-mono text-indigo-600 dark:text-indigo-400">
              0.946 (XGBoost)
            </div>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-slate-400">Covariate Drift (PSI)</span>
            <div className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400">
              0.048 (Nominal)
            </div>
          </div>
          <div className="space-y-0.5 col-span-2 sm:col-span-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Experiment Power</span>
            <div className="text-base font-bold font-mono text-slate-900 dark:text-slate-100">
              80% @ α=0.05
            </div>
          </div>
        </div>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveSubTab('leaderboard')}
          className={`flex items-center gap-2 py-2 px-3.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activeSubTab === 'leaderboard'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#161b22]'
          }`}
        >
          <Trophy size={14} />
          <span>Model Leaderboard</span>
        </button>

        <button
          onClick={() => setActiveSubTab('xai')}
          className={`flex items-center gap-2 py-2 px-3.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activeSubTab === 'xai'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#161b22]'
          }`}
        >
          <BrainCircuit size={14} />
          <span>Explainable AI (XAI)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('profiling')}
          className={`flex items-center gap-2 py-2 px-3.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activeSubTab === 'profiling'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#161b22]'
          }`}
        >
          <Database size={14} />
          <span>Statistical EDA</span>
        </button>

        <button
          onClick={() => setActiveSubTab('abtesting')}
          className={`flex items-center gap-2 py-2 px-3.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activeSubTab === 'abtesting'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#161b22]'
          }`}
        >
          <FlaskConical size={14} />
          <span>A/B Testing Calculator</span>
        </button>

        <button
          onClick={() => setActiveSubTab('mlops')}
          className={`flex items-center gap-2 py-2 px-3.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activeSubTab === 'mlops'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#161b22]'
          }`}
        >
          <Workflow size={14} />
          <span>MLOps & Drift</span>
        </button>

        <button
          onClick={() => setActiveSubTab('code')}
          className={`flex items-center gap-2 py-2 px-3.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activeSubTab === 'code'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#161b22]'
          }`}
        >
          <Code2 size={14} />
          <span>Senior Code Vault</span>
        </button>

        <button
          onClick={() => setActiveSubTab('copilot')}
          className={`flex items-center gap-2 py-2 px-3.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activeSubTab === 'copilot'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm'
              : 'text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40'
          }`}
        >
          <Sparkles size={14} className="text-amber-300" />
          <span>AI Copilot</span>
        </button>
      </div>

      {/* Render Subtab Content */}
      <div className="pt-2">
        {activeSubTab === 'leaderboard' && <ModelLeaderboardTab />}
        {activeSubTab === 'xai' && <XaiSimulatorTab />}
        {activeSubTab === 'profiling' && <DataProfilingTab />}
        {activeSubTab === 'abtesting' && <AbTestingTab />}
        {activeSubTab === 'mlops' && <MlopsDriftTab />}
        {activeSubTab === 'code' && <CodeVaultTab />}
        {activeSubTab === 'copilot' && <AiCopilotTab />}
      </div>
    </div>
  );
};
