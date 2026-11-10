/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  BarChart3,
  Database,
  FileSpreadsheet,
  AlertCircle,
  Hash,
  Activity,
  Layers,
  Sparkles,
  PieChart,
} from 'lucide-react';
import { DATASETS, DatasetSummary, FeatureStat } from '../../utils/dataScienceData';

export const DataProfilingTab: React.FC = () => {
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>('telecom-churn');
  const dataset = DATASETS.find((d) => d.id === selectedDatasetId) || DATASETS[0];

  const [selectedFeatureName, setSelectedFeatureName] = useState<string>(
    dataset.features[0].name
  );

  const activeFeature =
    dataset.features.find((f) => f.name === selectedFeatureName) || dataset.features[0];

  return (
    <div className="space-y-6">
      {/* Dataset Selection Header */}
      <div className="bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800 flex items-center gap-1">
                <Database size={12} /> Data Lake Profiler
              </span>
              <span className="text-xs text-slate-500 font-mono">Polars Out-Of-Core Engine</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Exploratory Data Analysis & Statistical Profiling
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              Automated data profiling for production machine learning. Inspect distribution skewness,
              Tukey outlier flags, and Pearson correlation matrices to prevent multicollinearity.
            </p>
          </div>

          {/* Dataset selector chips */}
          <div className="flex items-center gap-2 flex-wrap">
            {DATASETS.map((d) => (
              <button
                key={d.id}
                onClick={() => {
                  setSelectedDatasetId(d.id);
                  setSelectedFeatureName(d.features[0].name);
                }}
                className={`py-1.5 px-3 text-xs font-semibold rounded-lg border transition-all ${
                  d.id === selectedDatasetId
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-[#161b22] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                {d.name.split(' ')[0]} {d.name.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>

        {/* High Level Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-5 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-slate-400">Total Observations</span>
            <div className="text-base font-bold font-mono text-slate-900 dark:text-slate-100">
              {dataset.rows.toLocaleString()} rows
            </div>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-slate-400">Dimensions</span>
            <div className="text-base font-bold font-mono text-slate-900 dark:text-slate-100">
              {dataset.columns} Features
            </div>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-slate-400">Missing Cells</span>
            <div className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400">
              {dataset.missingCellsPercent}%
            </div>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-slate-400">RAM Footprint</span>
            <div className="text-base font-bold font-mono text-slate-900 dark:text-slate-100">
              {dataset.memorySizeMb} MB
            </div>
          </div>
          <div className="space-y-0.5 col-span-2 sm:col-span-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Target Imbalance</span>
            <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 truncate">
              {dataset.targetImbalance}
            </div>
          </div>
        </div>
      </div>

      {/* Feature Deep Dive & Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Feature Selector List */}
        <div className="lg:col-span-4 bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm space-y-3">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-slate-800 pb-2">
            Dataset Features ({dataset.features.length})
          </h3>

          <div className="space-y-1.5">
            {dataset.features.map((feat) => {
              const isSelected = feat.name === selectedFeatureName;
              return (
                <button
                  key={feat.name}
                  onClick={() => setSelectedFeatureName(feat.name)}
                  className={`w-full text-left p-2.5 rounded-lg text-xs font-mono transition-all flex items-center justify-between border ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 font-bold'
                      : 'border-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#161b22]'
                  }`}
                >
                  <div className="truncate">
                    <span>{feat.name}</span>
                    <span className="text-[10px] text-slate-400 block font-sans capitalize">
                      {feat.type}
                    </span>
                  </div>
                  {feat.outlierCount > 0 && (
                    <span className="text-[10px] bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 px-1.5 py-0.5 rounded font-sans">
                      {feat.outlierCount} outliers
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Feature Stats & Distribution Chart */}
        <div className="lg:col-span-8 bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Feature Statistics</span>
              <h4 className="text-base font-bold font-mono text-slate-900 dark:text-slate-100">
                {activeFeature.name}
              </h4>
            </div>
            <span className="text-xs uppercase font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {activeFeature.type}
            </span>
          </div>

          {activeFeature.type === 'numeric' ? (
            <>
              {/* Statistical metrics grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-slate-50 dark:bg-[#161b22] p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Mean</span>
                  <span className="text-sm font-bold font-mono text-slate-900 dark:text-slate-100">
                    {activeFeature.mean?.toFixed(2)}
                  </span>
                </div>
                <div className="bg-slate-50 dark:bg-[#161b22] p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Std Dev (σ)</span>
                  <span className="text-sm font-bold font-mono text-slate-900 dark:text-slate-100">
                    {activeFeature.std?.toFixed(2)}
                  </span>
                </div>
                <div className="bg-slate-50 dark:bg-[#161b22] p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Median (Q2)</span>
                  <span className="text-sm font-bold font-mono text-slate-900 dark:text-slate-100">
                    {activeFeature.median?.toFixed(2)}
                  </span>
                </div>
                <div className="bg-slate-50 dark:bg-[#161b22] p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Skewness</span>
                  <span
                    className={`text-sm font-bold font-mono ${
                      (activeFeature.skewness || 0) > 1.0
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-slate-900 dark:text-slate-100'
                    }`}
                  >
                    {activeFeature.skewness?.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Distribution Histogram */}
              {activeFeature.distributionBins && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <BarChart3 size={15} className="text-blue-500" />
                      <span>Empirical Frequency Distribution</span>
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">
                      Range: [{activeFeature.min} → {activeFeature.max}]
                    </span>
                  </div>

                  <div className="space-y-2 pt-1">
                    {activeFeature.distributionBins.map((bin) => {
                      const maxBinCount = Math.max(
                        ...activeFeature.distributionBins!.map((b) => b.count)
                      );
                      const pctWidth = (bin.count / maxBinCount) * 100;

                      return (
                        <div key={bin.bin} className="space-y-1">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-slate-700 dark:text-slate-300">{bin.bin}</span>
                            <span className="text-slate-500">{bin.count.toLocaleString()} cases</span>
                          </div>
                          <div className="h-3.5 w-full bg-slate-100 dark:bg-slate-800 rounded overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded transition-all duration-300"
                              style={{ width: `${pctWidth}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Categorical Cardinality Distribution */
            <div className="space-y-3">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                Category Frequency Breakdown
              </span>
              <div className="space-y-2">
                {activeFeature.topCategories?.map((cat) => (
                  <div key={cat.label} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {cat.label}
                      </span>
                      <span className="font-mono text-slate-500">
                        {cat.count.toLocaleString()} ({cat.pct}%)
                      </span>
                    </div>
                    <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded"
                        style={{ width: `${cat.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pearson Correlation Matrix */}
      {dataset.correlations.length > 0 && (
        <div className="bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Activity size={16} className="text-emerald-500" />
                <span>Feature Correlation Pairs (Pearson r)</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Detecting multicollinearity to prevent variance inflation (VIF &gt; 5) in downstream models
              </p>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" /> Positive
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Negative
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {dataset.correlations.map((c, idx) => {
              const isHigh = Math.abs(c.value) > 0.4;
              const isPositive = c.value > 0;

              return (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border text-xs flex items-center justify-between gap-3 ${
                    isHigh
                      ? 'bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-900/40'
                      : 'bg-slate-50 dark:bg-[#161b22] border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="truncate space-y-0.5">
                    <div className="font-mono font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {c.featA}
                    </div>
                    <div className="font-mono text-slate-500 text-[10px] truncate">
                      ↔ {c.featB}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={`font-mono font-bold text-sm px-2 py-0.5 rounded ${
                        isPositive
                          ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-100/60 dark:bg-indigo-900/40'
                          : 'text-rose-600 dark:text-rose-400 bg-rose-100/60 dark:bg-rose-900/40'
                      }`}
                    >
                      {c.value > 0 ? `+${c.value.toFixed(2)}` : c.value.toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
