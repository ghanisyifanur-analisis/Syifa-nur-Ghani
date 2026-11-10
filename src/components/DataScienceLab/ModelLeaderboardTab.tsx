/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Trophy,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Cpu,
  Layers,
  ArrowUpDown,
  Zap,
  Info,
  DollarSign,
} from 'lucide-react';
import { ML_MODELS, ModelMetric } from '../../utils/dataScienceData';

export const ModelLeaderboardTab: React.FC = () => {
  const [models, setModels] = useState<ModelMetric[]>(ML_MODELS);
  const [selectedModelId, setSelectedModelId] = useState<string>('lgbm-prod-v3');
  const [sortBy, setSortBy] = useState<keyof ModelMetric>('rocAuc');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  // Decision Threshold Slider (0.10 to 0.90)
  const [threshold, setThreshold] = useState<number>(0.5);
  // Cost matrix assumptions for churn/fraud
  const costFN = 450; // Lost customer / undetected fraud
  const costFP = 35; // Support contact outreach friction

  const selectedModel = models.find((m) => m.id === selectedModelId) || models[0];

  const handleSort = (field: keyof ModelMetric) => {
    if (sortBy === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(field);
      setSortAsc(false);
    }
  };

  const sortedModels = [...models].sort((a, b) => {
    const valA = a[sortBy];
    const valB = b[sortBy];
    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortAsc ? valA - valB : valB - valA;
    }
    return 0;
  });

  // Dynamically estimate confusion matrix on a benchmark validation set of 10,000 cases
  // True Positives rate adjusts with threshold
  const totalVal = 10000;
  const actualPositives = 1600; // 16% positive rate
  const actualNegatives = totalVal - actualPositives;

  // Recall drops as threshold increases, Precision increases
  // Non-linear realistic sigmoid response based on selected model's ROC-AUC
  const aucMultiplier = selectedModel.rocAuc / 0.94;
  const recallAtThreshold = Math.max(
    0.1,
    Math.min(0.99, (1 - threshold * 0.9) * 1.15 * aucMultiplier)
  );
  const falsePositiveRate = Math.max(
    0.01,
    Math.min(0.8, Math.exp(-threshold * 4.5) * (1.1 - aucMultiplier * 0.2))
  );

  const TP = Math.round(actualPositives * recallAtThreshold);
  const FN = actualPositives - TP;
  const FP = Math.round(actualNegatives * falsePositiveRate);
  const TN = actualNegatives - FP;

  const currentPrecision = TP + FP > 0 ? TP / (TP + FP) : 0;
  const currentRecall = actualPositives > 0 ? TP / actualPositives : 0;
  const currentF1 =
    currentPrecision + currentRecall > 0
      ? (2 * currentPrecision * currentRecall) / (currentPrecision + currentRecall)
      : 0;

  const totalCost = FN * costFN + FP * costFP;

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-900/60 rounded-xl p-5 text-white shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 size={12} /> Production Active
              </span>
              <span className="text-xs text-indigo-300 font-mono">Registry: v3.4.1</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight">
              Machine Learning Model Leaderboard & Registry
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Evaluating 6 competing architectures on holdout validation datasets. Compare ROC-AUC, PR-AUC,
              inference latency (p95), and evaluate the cost-optimized decision threshold.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-800/80 border border-slate-700/60 rounded-lg p-3">
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-slate-400">Champion Latency</div>
              <div className="text-lg font-bold text-emerald-400 font-mono">11.4 ms <span className="text-xs font-normal text-slate-400">p95</span></div>
            </div>
            <div className="w-px h-8 bg-slate-700" />
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-slate-400">Peak ROC-AUC</div>
              <div className="text-lg font-bold text-amber-300 font-mono">0.946</div>
            </div>
          </div>
        </div>
      </div>

      {/* Model Leaderboard Table */}
      <div className="bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Trophy size={18} className="text-amber-500" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Evaluated Model Architectures ({models.length})
            </h3>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Click table headers to sort · Click row to inspect hyperparameter config
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#161b22] text-slate-600 dark:text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Model & Family</th>
                <th className="py-3 px-3">Status</th>
                <th
                  onClick={() => handleSort('rocAuc')}
                  className="py-3 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white"
                >
                  <div className="flex items-center gap-1">
                    <span>ROC-AUC</span>
                    <ArrowUpDown size={11} />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('prAuc')}
                  className="py-3 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white"
                >
                  <div className="flex items-center gap-1">
                    <span>PR-AUC</span>
                    <ArrowUpDown size={11} />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('f1Score')}
                  className="py-3 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white"
                >
                  <div className="flex items-center gap-1">
                    <span>F1-Score</span>
                    <ArrowUpDown size={11} />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('latencyP95Ms')}
                  className="py-3 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white"
                >
                  <div className="flex items-center gap-1">
                    <span>Latency (p95)</span>
                    <ArrowUpDown size={11} />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('peakRamMb')}
                  className="py-3 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white"
                >
                  <div className="flex items-center gap-1">
                    <span>RAM</span>
                    <ArrowUpDown size={11} />
                  </div>
                </th>
                <th className="py-3 px-3">PSI Drift</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {sortedModels.map((m) => {
                const isSelected = m.id === selectedModelId;
                return (
                  <tr
                    key={m.id}
                    onClick={() => setSelectedModelId(m.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-blue-50/70 dark:bg-blue-950/30 font-medium'
                        : 'hover:bg-slate-50/60 dark:hover:bg-[#161b22]/60'
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            m.status === 'Production'
                              ? 'bg-emerald-500 ring-2 ring-emerald-300/40'
                              : m.status === 'Challenger'
                              ? 'bg-amber-500'
                              : 'bg-slate-400'
                          }`}
                        />
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-slate-100">
                            {m.name}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400">
                            {m.family}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          m.status === 'Production'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                            : m.status === 'Challenger'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-300 dark:border-amber-700'
                            : m.status === 'Candidate'
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/50 dark:text-purple-300'
                            : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                        }`}
                      >
                        {m.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-mono font-bold text-slate-900 dark:text-slate-100">
                      {m.rocAuc.toFixed(3)}
                    </td>
                    <td className="py-3.5 px-3 font-mono text-slate-700 dark:text-slate-300">
                      {m.prAuc.toFixed(3)}
                    </td>
                    <td className="py-3.5 px-3 font-mono text-slate-700 dark:text-slate-300">
                      {m.f1Score.toFixed(3)}
                    </td>
                    <td className="py-3.5 px-3 font-mono">
                      <span
                        className={`${
                          m.latencyP95Ms < 15
                            ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                            : m.latencyP95Ms < 25
                            ? 'text-amber-600 dark:text-amber-400'
                            : 'text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {m.latencyP95Ms.toFixed(1)} ms
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-mono text-slate-600 dark:text-slate-400">
                      {m.peakRamMb} MB
                    </td>
                    <td className="py-3.5 px-3 font-mono">
                      <span
                        className={`text-[11px] px-1.5 py-0.5 rounded ${
                          m.psiDrift < 0.1
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400'
                            : 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400'
                        }`}
                      >
                        {m.psiDrift.toFixed(3)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Selected Model Details Drawer */}
        <div className="bg-slate-50 dark:bg-[#161b22] p-4 border-t border-slate-200 dark:border-slate-800 text-xs flex flex-col md:flex-row gap-4 justify-between items-start">
          <div className="space-y-1 max-w-xl">
            <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <span>Selected: {selectedModel.name}</span>
              <span className="text-[10px] text-slate-500 font-normal">({selectedModel.family})</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400">{selectedModel.description}</p>
          </div>
          <div className="bg-white dark:bg-[#0d1117] p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-[11px] text-slate-700 dark:text-slate-300 max-w-md w-full">
            <span className="text-slate-400 font-sans block text-[10px] uppercase font-bold mb-1">
              Hyperparameter Specification
            </span>
            <code>{selectedModel.parameters}</code>
          </div>
        </div>
      </div>

      {/* Interactive Threshold & Confusion Matrix Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Threshold Slider & Metrics */}
        <div className="lg:col-span-6 bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Sliders size={16} className="text-blue-500" />
                <span>Decision Threshold Tuner</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Adjust classification cutoff to balance Precision vs Recall tradeoffs
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-mono font-bold text-sm px-3 py-1 rounded-md border border-blue-200 dark:border-blue-800">
              τ = {threshold.toFixed(2)}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span>Aggressive (High Recall)</span>
              <span>Balanced (0.50)</span>
              <span>Conservative (High Precision)</span>
            </div>
            <input
              type="range"
              min="0.10"
              max="0.90"
              step="0.02"
              value={threshold}
              onChange={(e) => setThreshold(parseFloat(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* Real-time Dynamic Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-50 dark:bg-[#161b22] border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500">Precision</div>
              <div className="text-xl font-bold font-mono text-indigo-600 dark:text-indigo-400">
                {(currentPrecision * 100).toFixed(1)}%
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">TP / (TP + FP)</div>
            </div>

            <div className="bg-slate-50 dark:bg-[#161b22] border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500">Recall (Sensitivity)</div>
              <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                {(currentRecall * 100).toFixed(1)}%
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">TP / Actual Pos</div>
            </div>

            <div className="bg-slate-50 dark:bg-[#161b22] border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500">F1-Score</div>
              <div className="text-xl font-bold font-mono text-blue-600 dark:text-blue-400">
                {currentF1.toFixed(3)}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Harmonic Mean</div>
            </div>
          </div>

          {/* Business Cost Impact Estimation */}
          <div className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-lg p-3 text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-amber-900 dark:text-amber-200">
              <DollarSign size={14} className="text-amber-600" />
              <span>Business Financial Cost Optimization</span>
            </div>
            <p className="text-amber-800 dark:text-amber-300 leading-relaxed text-[11px]">
              Assuming $450 cost per False Negative (lost customer) and $35 cost per False Positive (CSM outreach).
            </p>
            <div className="flex items-center justify-between font-mono pt-1 text-slate-800 dark:text-slate-200">
              <span>Expected Misclassification Loss:</span>
              <span className="font-bold text-sm text-rose-600 dark:text-rose-400">
                ${totalCost.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Interactive 2x2 Confusion Matrix */}
        <div className="lg:col-span-6 bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Layers size={16} className="text-purple-500" />
              <span>Confusion Matrix (N = {totalVal.toLocaleString()})</span>
            </h3>
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
              Model: {selectedModel.name.split(' ')[0]}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            {/* True Negative */}
            <div className="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4">
              <div className="flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
                <span>True Negative (TN)</span>
                <span className="text-[10px] bg-emerald-200 dark:bg-emerald-900/60 px-1.5 py-0.5 rounded">
                  Correct
                </span>
              </div>
              <div className="text-2xl font-bold font-mono text-emerald-900 dark:text-emerald-200 mt-2">
                {TN.toLocaleString()}
              </div>
              <div className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-1">
                Retained customers accurately predicted
              </div>
            </div>

            {/* False Positive */}
            <div className="bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-lg p-4">
              <div className="flex items-center justify-between text-xs text-rose-800 dark:text-rose-300 font-semibold">
                <span>False Positive (FP)</span>
                <span className="text-[10px] bg-rose-200 dark:bg-rose-900/60 px-1.5 py-0.5 rounded">
                  Type I Error
                </span>
              </div>
              <div className="text-2xl font-bold font-mono text-rose-900 dark:text-rose-200 mt-2">
                {FP.toLocaleString()}
              </div>
              <div className="text-[11px] text-rose-700 dark:text-rose-400 mt-1">
                Falsely flagged healthy accounts
              </div>
            </div>

            {/* False Negative */}
            <div className="bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-lg p-4">
              <div className="flex items-center justify-between text-xs text-rose-800 dark:text-rose-300 font-semibold">
                <span>False Negative (FN)</span>
                <span className="text-[10px] bg-rose-200 dark:bg-rose-900/60 px-1.5 py-0.5 rounded">
                  Type II Error
                </span>
              </div>
              <div className="text-2xl font-bold font-mono text-rose-900 dark:text-rose-200 mt-2">
                {FN.toLocaleString()}
              </div>
              <div className="text-[11px] text-rose-700 dark:text-rose-400 mt-1">
                Missed churn accounts (High risk!)
              </div>
            </div>

            {/* True Positive */}
            <div className="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4">
              <div className="flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
                <span>True Positive (TP)</span>
                <span className="text-[10px] bg-emerald-200 dark:bg-emerald-900/60 px-1.5 py-0.5 rounded">
                  Correct
                </span>
              </div>
              <div className="text-2xl font-bold font-mono text-emerald-900 dark:text-emerald-200 mt-2">
                {TP.toLocaleString()}
              </div>
              <div className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-1">
                Correctly identified churn risks
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 pt-2">
            <Info size={13} className="shrink-0 text-slate-400" />
            <span>
              Tip: As a Senior Data Scientist, threshold selection should align with executive ROI rather than default 0.50.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
