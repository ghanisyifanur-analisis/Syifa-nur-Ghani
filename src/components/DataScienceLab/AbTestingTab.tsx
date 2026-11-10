/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  FlaskConical,
  Calculator,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  Zap,
} from 'lucide-react';
import {
  AbTestInput,
  computeAbTestResults,
  estimateRequiredSampleSize,
} from '../../utils/dataScienceData';

export const AbTestingTab: React.FC = () => {
  const [testMode, setTestMode] = useState<'evaluator' | 'power'>('evaluator');

  // Mode 1 State: Hypothesis Test Evaluator
  const [controlVisitors, setControlVisitors] = useState<number>(15000);
  const [controlConversions, setControlConversions] = useState<number>(1800);
  const [variantVisitors, setVariantVisitors] = useState<number>(15200);
  const [variantConversions, setVariantConversions] = useState<number>(2050);
  const [confidenceLevel, setConfidenceLevel] = useState<0.9 | 0.95 | 0.99>(0.95);

  const abResult = computeAbTestResults({
    controlVisitors,
    controlConversions,
    variantVisitors,
    variantConversions,
    confidenceLevel,
  });

  // Mode 2 State: Sample Size Power Estimator
  const [baselineRatePercent, setBaselineRatePercent] = useState<number>(12.0);
  const [mdePercent, setMdePercent] = useState<number>(5.0);
  const [power, setPower] = useState<number>(0.8);
  const [dailyTraffic, setDailyTraffic] = useState<number>(2500);

  const powerSize = estimateRequiredSampleSize(
    baselineRatePercent / 100,
    mdePercent,
    0.95,
    power
  );
  const daysRequired = Math.ceil(powerSize.totalSampleSize / dailyTraffic);

  // Quick presets for test evaluator
  const loadPreset = (type: 'significant-win' | 'inconclusive' | 'harmful') => {
    if (type === 'significant-win') {
      setControlVisitors(25000);
      setControlConversions(2500); // 10%
      setVariantVisitors(25000);
      setVariantConversions(2850); // 11.4% -> +14% lift
      setConfidenceLevel(0.95);
    } else if (type === 'inconclusive') {
      setControlVisitors(4000);
      setControlConversions(480); // 12%
      setVariantVisitors(4000);
      setVariantConversions(510); // 12.75% -> underpowered
      setConfidenceLevel(0.95);
    } else {
      setControlVisitors(12000);
      setControlConversions(1440); // 12%
      setVariantVisitors(12000);
      setVariantConversions(1250); // 10.4% -> negative
      setConfidenceLevel(0.95);
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                <FlaskConical size={12} /> Causal Experimentation
              </span>
              <span className="text-xs text-slate-500 font-mono">Frequentist & Power Analysis</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              A/B Testing & Statistical Power Calculator
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              Ensure algorithm changes drive true causal business impact. Evaluate p-values, standard errors,
              confidence intervals, and calculate required sample sizes to avoid Type I and Type II statistical errors.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-100 dark:bg-[#161b22] p-1 rounded-lg border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setTestMode('evaluator')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                testMode === 'evaluator'
                  ? 'bg-white dark:bg-[#21262d] text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Results Evaluator
            </button>
            <button
              onClick={() => setTestMode('power')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                testMode === 'power'
                  ? 'bg-white dark:bg-[#21262d] text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Power & Sample Size
            </button>
          </div>
        </div>
      </div>

      {testMode === 'evaluator' ? (
        /* MODE 1: EVALUATOR */
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Input Controls */}
            <div className="lg:col-span-5 bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Calculator size={16} className="text-blue-500" />
                  <span>Experiment Parameters</span>
                </h3>
                {/* Presets */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => loadPreset('significant-win')}
                    className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                  >
                    Winner
                  </button>
                  <button
                    onClick={() => loadPreset('inconclusive')}
                    className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                  >
                    Inconclusive
                  </button>
                  <button
                    onClick={() => loadPreset('harmful')}
                    className="text-[10px] font-semibold px-2 py-0.5 rounded bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                  >
                    Degraded
                  </button>
                </div>
              </div>

              {/* Control Variant Form */}
              <div className="space-y-2 p-3 bg-slate-50 dark:bg-[#161b22] rounded-lg border border-slate-200 dark:border-slate-800">
                <div className="font-semibold text-xs text-slate-800 dark:text-slate-200">
                  Control Group (A - Current Baseline)
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1">Visitors (N_A)</label>
                    <input
                      type="number"
                      value={controlVisitors}
                      onChange={(e) => setControlVisitors(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-white dark:bg-[#0d1117] border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1">Conversions (C_A)</label>
                    <input
                      type="number"
                      value={controlConversions}
                      onChange={(e) => setControlConversions(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full bg-white dark:bg-[#0d1117] border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Challenger Variant Form */}
              <div className="space-y-2 p-3 bg-blue-50/50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900/40">
                <div className="font-semibold text-xs text-blue-900 dark:text-blue-200">
                  Variant Group (B - New ML Algorithm)
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1">Visitors (N_B)</label>
                    <input
                      type="number"
                      value={variantVisitors}
                      onChange={(e) => setVariantVisitors(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-white dark:bg-[#0d1117] border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1">Conversions (C_B)</label>
                    <input
                      type="number"
                      value={variantConversions}
                      onChange={(e) => setVariantConversions(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full bg-white dark:bg-[#0d1117] border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Confidence Level Selector */}
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Significance Threshold (1 - α)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {([0.9, 0.95, 0.99] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setConfidenceLevel(lvl)}
                      className={`py-1.5 px-2 text-xs font-medium rounded border transition-colors ${
                        confidenceLevel === lvl
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-slate-50 dark:bg-[#161b22] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {(lvl * 100).toFixed(0)}% (α = {(1 - lvl).toFixed(2)})
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Statistical Outputs */}
            <div className="lg:col-span-7 space-y-5">
              {/* Verdict Banner */}
              <div
                className={`p-5 rounded-xl border shadow-sm transition-all ${
                  abResult.isSignificant && abResult.relativeLift > 0
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
                    : abResult.isSignificant && abResult.relativeLift < 0
                    ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800'
                    : 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800'
                }`}
              >
                <div className="flex items-start gap-3">
                  {abResult.isSignificant && abResult.relativeLift > 0 ? (
                    <CheckCircle2 size={24} className="text-emerald-600 shrink-0 mt-0.5" />
                  ) : abResult.isSignificant && abResult.relativeLift < 0 ? (
                    <XCircle size={24} className="text-rose-600 shrink-0 mt-0.5" />
                  ) : (
                    <HelpCircle size={24} className="text-amber-600 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Statistical Hypothesis Test Outcome
                    </div>
                    <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
                      {abResult.isSignificant
                        ? abResult.relativeLift > 0
                          ? 'Statistically Significant Uplift Detected'
                          : 'Statistically Significant Negative Impact'
                        : 'Inconclusive Result (Fail to Reject H0)'}
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {abResult.verdict}
                    </p>
                  </div>
                </div>
              </div>

              {/* Conversion Comparison Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-center">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Control Rate (p_A)</div>
                  <div className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100 mt-1">
                    {(abResult.controlRate * 100).toFixed(2)}%
                  </div>
                </div>

                <div className="bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-center">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Variant Rate (p_B)</div>
                  <div className="text-lg font-bold font-mono text-blue-600 dark:text-blue-400 mt-1">
                    {(abResult.variantRate * 100).toFixed(2)}%
                  </div>
                </div>

                <div className="bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-center">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Relative Lift</div>
                  <div
                    className={`text-lg font-bold font-mono mt-1 ${
                      abResult.relativeLift > 0
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    {abResult.relativeLift > 0
                      ? `+${abResult.relativeLift.toFixed(2)}%`
                      : `${abResult.relativeLift.toFixed(2)}%`}
                  </div>
                </div>

                <div className="bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-center">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Two-Tailed p-Value</div>
                  <div
                    className={`text-lg font-bold font-mono mt-1 ${
                      abResult.isSignificant
                        ? 'text-emerald-600 dark:text-emerald-400 font-black'
                        : 'text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {abResult.pValue < 0.0001 ? '< 0.0001' : abResult.pValue.toFixed(4)}
                  </div>
                </div>
              </div>

              {/* Statistical Details Strip */}
              <div className="bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm space-y-2 text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300 block border-b border-slate-200 dark:border-slate-800 pb-2">
                  Rigorous Estimation Parameters
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 font-mono text-slate-600 dark:text-slate-400">
                  <div>
                    <span className="text-[10px] uppercase block text-slate-400">Z-Score</span>
                    <span className="text-slate-900 dark:text-slate-100 font-bold">
                      {abResult.zScore.toFixed(3)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase block text-slate-400">Standard Error (SE)</span>
                    <span className="text-slate-900 dark:text-slate-100 font-bold">
                      {abResult.standardError.toFixed(5)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase block text-slate-400">
                      {(confidenceLevel * 100).toFixed(0)}% Conf. Interval
                    </span>
                    <span className="text-slate-900 dark:text-slate-100 font-bold">
                      [{(abResult.ciLower * 100).toFixed(2)}%, {(abResult.ciUpper * 100).toFixed(2)}%]
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* MODE 2: POWER & SAMPLE SIZE CALCULATOR */
        <div className="bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
              Sample Size & Power Analysis Estimator (Evan Miller Formulation)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Compute the minimal sample required per variant before launching to guarantee sufficient statistical power.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Baseline Rate (%):
              </label>
              <input
                type="number"
                step="0.5"
                value={baselineRatePercent}
                onChange={(e) => setBaselineRatePercent(parseFloat(e.target.value) || 1)}
                className="w-full bg-slate-50 dark:bg-[#161b22] border border-slate-300 dark:border-slate-700 rounded px-3 py-2 text-xs font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Minimum Detectable Effect (MDE %):
              </label>
              <input
                type="number"
                step="0.5"
                value={mdePercent}
                onChange={(e) => setMdePercent(parseFloat(e.target.value) || 1)}
                className="w-full bg-slate-50 dark:bg-[#161b22] border border-slate-300 dark:border-slate-700 rounded px-3 py-2 text-xs font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Statistical Power (1 - β):
              </label>
              <select
                value={power}
                onChange={(e) => setPower(parseFloat(e.target.value))}
                className="w-full bg-slate-50 dark:bg-[#161b22] border border-slate-300 dark:border-slate-700 rounded px-3 py-2 text-xs font-mono"
              >
                <option value={0.8}>80% Standard Power</option>
                <option value={0.9}>90% High Power</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Daily Traffic (Users / Day):
              </label>
              <input
                type="number"
                step="500"
                value={dailyTraffic}
                onChange={(e) => setDailyTraffic(Math.max(100, parseInt(e.target.value) || 100))}
                className="w-full bg-slate-50 dark:bg-[#161b22] border border-slate-300 dark:border-slate-700 rounded px-3 py-2 text-xs font-mono"
              />
            </div>
          </div>

          {/* Results Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-slate-50 dark:bg-[#161b22] border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400">Sample Size Per Variant</span>
              <div className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-400 mt-1">
                {powerSize.sampleSizePerVariant.toLocaleString()}
              </div>
              <span className="text-[11px] text-slate-400 mt-0.5 block">50/50 split</span>
            </div>

            <div className="bg-slate-50 dark:bg-[#161b22] border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400">Total Sample Needed</span>
              <div className="text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-1">
                {powerSize.totalSampleSize.toLocaleString()}
              </div>
              <span className="text-[11px] text-slate-400 mt-0.5 block">Control + Variant</span>
            </div>

            <div className="bg-slate-50 dark:bg-[#161b22] border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400">Estimated Duration</span>
              <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                {daysRequired} Days
              </div>
              <span className="text-[11px] text-slate-400 mt-0.5 block">
                At {dailyTraffic.toLocaleString()} users/day
              </span>
            </div>
          </div>

          {/* CUPED Tip */}
          <div className="bg-purple-50/60 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/40 rounded-lg p-3 text-xs flex items-center gap-3">
            <Sparkles size={18} className="text-purple-600 shrink-0" />
            <p className="text-purple-900 dark:text-purple-300 leading-relaxed">
              <strong>Senior DS Optimization (CUPED):</strong> Using pre-experiment user activity features as a control covariate (Y_cuped = Y - θ·X) reduces variance Var(Y_cuped) = Var(Y)(1 - ρ²), shrinking required sample size by ~30–45% without losing power.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
