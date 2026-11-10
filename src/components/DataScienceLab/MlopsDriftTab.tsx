/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Workflow,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Server,
  Database,
  Cpu,
  RefreshCw,
  Bell,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { computePsi, PsiBucket } from '../../utils/dataScienceData';

interface FeatureDriftItem {
  featureName: string;
  baselinePcts: number[];
  currentPcts: number[];
  buckets: string[];
}

export const MlopsDriftTab: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<string>('network_packet_loss');

  const driftFeatures: FeatureDriftItem[] = [
    {
      featureName: 'network_packet_loss',
      buckets: ['<0.5%', '0.5-1.5%', '1.5-3.0%', '>3.0%'],
      baselinePcts: [50.0, 35.0, 12.0, 3.0],
      currentPcts: [28.0, 32.0, 26.0, 14.0], // Big jump in packet loss in prod!
    },
    {
      featureName: 'monthly_contract_value',
      buckets: ['$20-$50', '$50-$80', '$80-$110', '$110+'],
      baselinePcts: [25.0, 42.0, 24.0, 9.0],
      currentPcts: [24.0, 43.0, 23.5, 9.5], // very stable
    },
    {
      featureName: 'support_tickets_90d',
      buckets: ['0 tickets', '1-2 tickets', '3-4 tickets', '5+ tickets'],
      baselinePcts: [35.0, 45.0, 15.0, 5.0],
      currentPcts: [29.0, 42.0, 20.0, 9.0], // moderate shift
    },
  ];

  const activeItem =
    driftFeatures.find((f) => f.featureName === selectedFeature) || driftFeatures[0];

  const psiCalc = computePsi(activeItem.baselinePcts, activeItem.currentPcts);

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800 flex items-center gap-1">
                <Workflow size={12} /> Production MLOps
              </span>
              <span className="text-xs text-slate-500 font-mono">Continuous Telemetry & Drift</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              MLOps System Architecture & Population Stability Index (PSI)
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              Monitoring models post-deployment. Track covariate distribution shifts in real-time,
              enforce schema contracts, and manage automated model retraining triggers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 text-xs font-semibold px-3 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5">
              <Server size={14} /> Triton Serving Online
            </span>
          </div>
        </div>
      </div>

      {/* End-to-End MLOps Pipeline Flow */}
      <div className="bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Workflow size={16} className="text-blue-500" />
            <span>End-to-End Senior MLOps Architecture</span>
          </h3>
          <span className="text-xs text-slate-500 font-mono">CI/CD & Model Governance</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
          {/* Step 1: Feature Store */}
          <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#161b22] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                01 · Data Layer
              </span>
              <Database size={14} className="text-blue-500" />
            </div>
            <div className="font-bold text-xs text-slate-900 dark:text-slate-100">
              Feast Feature Store
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              Redis low-latency online lookup + BigQuery offline historical feature point-in-time joins.
            </p>
          </div>

          {/* Step 2: Validation */}
          <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#161b22] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                02 · Schema Guard
              </span>
              <ShieldCheck size={14} className="text-purple-500" />
            </div>
            <div className="font-bold text-xs text-slate-900 dark:text-slate-100">
              Pandera Schema Tests
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              Automated data validation gates. Rejects null spikes, range violations, or unexpected data types.
            </p>
          </div>

          {/* Step 3: Training & Registry */}
          <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#161b22] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                03 · Training
              </span>
              <Cpu size={14} className="text-amber-500" />
            </div>
            <div className="font-bold text-xs text-slate-900 dark:text-slate-100">
              Optuna & MLflow
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              Distributed hyperparameter optimization on Ray. Model artifact versioning with artifact hashes.
            </p>
          </div>

          {/* Step 4: Inference */}
          <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#161b22] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                04 · Serving
              </span>
              <Server size={14} className="text-emerald-500" />
            </div>
            <div className="font-bold text-xs text-slate-900 dark:text-slate-100">
              Triton Inference
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              Dynamic batching, ONNX runtime, C++ execution engine guaranteeing &lt;15ms p95 latency.
            </p>
          </div>

          {/* Step 5: Monitoring */}
          <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#161b22] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                05 · Telemetry
              </span>
              <Activity size={14} className="text-rose-500" />
            </div>
            <div className="font-bold text-xs text-slate-900 dark:text-slate-100">
              Evidently & PSI
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              Continuous drift monitoring. Triggers automated retraining DAGs when PSI exceeds 0.25 threshold.
            </p>
          </div>
        </div>
      </div>

      {/* Feature Drift Inspector & PSI Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Feature Selector */}
        <div className="lg:col-span-4 bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm space-y-3">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-slate-800 pb-2">
            Monitored Telemetry Features
          </h3>

          <div className="space-y-2">
            {driftFeatures.map((item) => {
              const itemPsi = computePsi(item.baselinePcts, item.currentPcts);
              const isSelected = item.featureName === selectedFeature;

              return (
                <button
                  key={item.featureName}
                  onClick={() => setSelectedFeature(item.featureName)}
                  className={`w-full text-left p-3 rounded-lg text-xs transition-all border ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800'
                      : 'bg-slate-50/60 dark:bg-[#161b22] border-slate-200 dark:border-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-semibold text-slate-900 dark:text-slate-100">
                      {item.featureName}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        itemPsi.status === 'Significant Drift'
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                          : itemPsi.status === 'Moderate Drift'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                      }`}
                    >
                      {itemPsi.status}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-2 text-[11px] text-slate-500">
                    <span>PSI Score:</span>
                    <span className="font-mono font-bold">{itemPsi.totalPsi.toFixed(3)}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: PSI Breakdown */}
        <div className="lg:col-span-8 bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">
                Drift Analysis for Feature
              </span>
              <h4 className="text-base font-bold font-mono text-slate-900 dark:text-slate-100">
                {activeItem.featureName}
              </h4>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total PSI</span>
              <span
                className={`text-xl font-bold font-mono ${
                  psiCalc.status === 'Significant Drift'
                    ? 'text-rose-600 dark:text-rose-400'
                    : psiCalc.status === 'Moderate Drift'
                    ? 'text-amber-600 dark:text-amber-400'
                    : 'text-emerald-600 dark:text-emerald-400'
                }`}
              >
                {psiCalc.totalPsi.toFixed(3)}
              </span>
            </div>
          </div>

          {/* Bucket Comparison Visual */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
              <span>Bin Partition</span>
              <div className="flex items-center gap-4 font-mono text-[11px]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400" /> Training Baseline
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> Production Live
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {activeItem.buckets.map((bucket, idx) => {
                const b = activeItem.baselinePcts[idx];
                const c = activeItem.currentPcts[idx];
                const delta = c - b;

                return (
                  <div key={bucket} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-800 dark:text-slate-200 font-semibold">{bucket}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-500">Base: {b}%</span>
                        <span className="text-blue-600 dark:text-blue-400 font-bold">Prod: {c}%</span>
                        <span
                          className={`text-[10px] px-1 py-0.2 rounded font-mono ${
                            Math.abs(delta) > 8
                              ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                              : 'bg-slate-100 text-slate-600 dark:bg-slate-800'
                          }`}
                        >
                          {delta > 0 ? `+${delta}%` : `${delta}%`}
                        </span>
                      </div>
                    </div>

                    {/* Dual comparison bar */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded overflow-hidden">
                        <div
                          className="h-full bg-slate-400 rounded transition-all duration-300"
                          style={{ width: `${b}%` }}
                        />
                      </div>
                      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded overflow-hidden">
                        <div
                          className={`h-full rounded transition-all duration-300 ${
                            Math.abs(delta) > 8 ? 'bg-rose-500' : 'bg-blue-600'
                          }`}
                          style={{ width: `${c}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Trigger Alert */}
          {psiCalc.status === 'Significant Drift' && (
            <div className="p-4 bg-rose-50/70 dark:bg-rose-950/30 border border-rose-300 dark:border-rose-800 rounded-xl flex items-start gap-3">
              <AlertTriangle size={20} className="text-rose-600 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <div className="font-bold text-rose-900 dark:text-rose-200 uppercase tracking-wider">
                  Automated Alert: Concept & Covariate Drift Threshold Exceeded
                </div>
                <p className="text-rose-800 dark:text-rose-300 leading-relaxed">
                  PSI on <code>{activeItem.featureName}</code> is {psiCalc.totalPsi} (&gt; 0.25). Production inputs have meaningfully diverged from the training dataset. Automated Airflow retraining workflow DAG <code>churn_retrain_v3</code> triggered with warm-start weights.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
