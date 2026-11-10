/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  BrainCircuit,
  Sliders,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  RotateCcw,
  UserCheck,
  Check,
} from 'lucide-react';
import {
  WhatIfInput,
  computeWhatIfInference,
  WhatIfResult,
} from '../../utils/dataScienceData';

export const XaiSimulatorTab: React.FC = () => {
  const [inputs, setInputs] = useState<WhatIfInput>({
    monthlyCharges: 85,
    tenureMonths: 14,
    contractType: 'month-to-month',
    supportTickets: 4,
    packetLossPct: 1.8,
    hasAutoPay: false,
  });

  const result: WhatIfResult = computeWhatIfInference(inputs);

  // Preset scenarios
  const applyPreset = (preset: 'at-risk' | 'enterprise-loyal' | 'tech-distress') => {
    if (preset === 'at-risk') {
      setInputs({
        monthlyCharges: 135,
        tenureMonths: 4,
        contractType: 'month-to-month',
        supportTickets: 6,
        packetLossPct: 3.2,
        hasAutoPay: false,
      });
    } else if (preset === 'enterprise-loyal') {
      setInputs({
        monthlyCharges: 65,
        tenureMonths: 48,
        contractType: 'two-year',
        supportTickets: 1,
        packetLossPct: 0.2,
        hasAutoPay: true,
      });
    } else {
      setInputs({
        monthlyCharges: 110,
        tenureMonths: 24,
        contractType: 'one-year',
        supportTickets: 7,
        packetLossPct: 4.1,
        hasAutoPay: true,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-purple-200 dark:border-purple-800 flex items-center gap-1">
                <BrainCircuit size={12} /> Explainable AI (XAI)
              </span>
              <span className="text-xs text-slate-500 font-mono">SHAP TreeExplainer Formulation</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Interactive What-If Inference & SHAP Attribution Simulator
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              Senior Data Scientists must provide transparent, interpretable machine learning. Adjust telemetry
              variables below to observe real-time model inference and the exact Shapley feature attributions.
            </p>
          </div>

          {/* Preset Archetypes */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-slate-500">Presets:</span>
            <button
              onClick={() => applyPreset('at-risk')}
              className="text-xs font-medium px-2.5 py-1 rounded bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 transition-colors"
            >
              High-Risk Flight
            </button>
            <button
              onClick={() => applyPreset('enterprise-loyal')}
              className="text-xs font-medium px-2.5 py-1 rounded bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 transition-colors"
            >
              Enterprise Loyal
            </button>
            <button
              onClick={() => applyPreset('tech-distress')}
              className="text-xs font-medium px-2.5 py-1 rounded bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 transition-colors"
            >
              QoS Distress
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Feature Controls */}
        <div className="lg:col-span-5 bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Sliders size={16} className="text-indigo-500" />
              <span>Feature Inputs</span>
            </h3>
            <button
              onClick={() =>
                setInputs({
                  monthlyCharges: 85,
                  tenureMonths: 14,
                  contractType: 'month-to-month',
                  supportTickets: 4,
                  packetLossPct: 1.8,
                  hasAutoPay: false,
                })
              }
              className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1"
            >
              <RotateCcw size={12} /> Reset
            </button>
          </div>

          {/* 1. Contract Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Contract Structure
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['month-to-month', 'one-year', 'two-year'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setInputs({ ...inputs, contractType: type })}
                  className={`py-1.5 px-2 text-xs font-medium rounded border transition-colors capitalize ${
                    inputs.contractType === type
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-[#161b22] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {type.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Tenure Months Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Account Tenure</span>
              <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">
                {inputs.tenureMonths} Months
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="72"
              value={inputs.tenureMonths}
              onChange={(e) => setInputs({ ...inputs, tenureMonths: parseInt(e.target.value, 10) })}
              className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* 3. Monthly Spend */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Monthly Contract Value</span>
              <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">
                ${inputs.monthlyCharges} /mo
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="180"
              step="5"
              value={inputs.monthlyCharges}
              onChange={(e) => setInputs({ ...inputs, monthlyCharges: parseInt(e.target.value, 10) })}
              className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* 4. Support Tickets */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Support Tickets (90d)</span>
              <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">
                {inputs.supportTickets} Tickets
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="12"
              value={inputs.supportTickets}
              onChange={(e) => setInputs({ ...inputs, supportTickets: parseInt(e.target.value, 10) })}
              className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* 5. Packet Loss % */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Network Packet Loss</span>
              <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">
                {inputs.packetLossPct.toFixed(1)}%
              </span>
            </div>
            <input
              type="range"
              min="0.0"
              max="5.0"
              step="0.1"
              value={inputs.packetLossPct}
              onChange={(e) => setInputs({ ...inputs, packetLossPct: parseFloat(e.target.value) })}
              className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* 6. AutoPay Toggle */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
            <div>
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Automated Direct Debit (AutoPay)
              </div>
              <div className="text-[11px] text-slate-500">Reduces involuntary card billing decline churn</div>
            </div>
            <button
              onClick={() => setInputs({ ...inputs, hasAutoPay: !inputs.hasAutoPay })}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                inputs.hasAutoPay ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  inputs.hasAutoPay ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Right Column: Output & SHAP Waterfall */}
        <div className="lg:col-span-7 space-y-6">
          {/* Prediction Gauge Card */}
          <div className="bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Model Output Inference
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold font-mono text-slate-900 dark:text-slate-100">
                    {(result.churnProbability * 100).toFixed(1)}%
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Predicted Churn Probability</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider border ${
                    result.riskTier === 'Critical'
                      ? 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
                      : result.riskTier === 'High'
                      ? 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
                      : result.riskTier === 'Moderate'
                      ? 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
                      : 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                  }`}
                >
                  {result.riskTier} Risk
                </span>
              </div>
            </div>

            {/* Probability Progress Bar */}
            <div className="mt-4">
              <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                <div
                  className={`transition-all duration-300 ${
                    result.churnProbability > 0.6
                      ? 'bg-rose-500'
                      : result.churnProbability > 0.35
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${result.churnProbability * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>0% (Safe)</span>
                <span>Base Population: {(result.baseProbability * 100).toFixed(0)}%</span>
                <span>100% (Imminent Churn)</span>
              </div>
            </div>
          </div>

          {/* SHAP Waterfall / Feature Attribution */}
          <div className="bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <TrendingUp size={16} className="text-purple-500" />
                  <span>SHAP Feature Attribution Waterfall</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Additive contribution f(x) = E[f(x)] + ∑ φᵢ (Red increases churn risk, Green protects account)
                </p>
              </div>
              <div className="text-[11px] font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                E[f(x)] = 0.180
              </div>
            </div>

            <div className="space-y-3">
              {result.shapContributions.map((contrib, idx) => {
                const isPositive = contrib.value > 0;
                const magnitude = Math.min(100, Math.abs(contrib.value) * 350);

                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono">
                        {contrib.feature}
                      </span>
                      <span
                        className={`font-mono font-bold ${
                          isPositive ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'
                        }`}
                      >
                        {isPositive ? `+${contrib.value.toFixed(3)}` : contrib.value.toFixed(3)}
                      </span>
                    </div>

                    {/* Attribution horizontal bar */}
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex items-center">
                      <div className="w-1/2 flex justify-end">
                        {!isPositive && (
                          <div
                            className="h-full bg-emerald-500 rounded-l transition-all duration-300"
                            style={{ width: `${magnitude}%` }}
                          />
                        )}
                      </div>
                      <div className="w-0.5 h-full bg-slate-400 dark:bg-slate-500" />
                      <div className="w-1/2 flex justify-start">
                        {isPositive && (
                          <div
                            className="h-full bg-rose-500 rounded-r transition-all duration-300"
                            style={{ width: `${magnitude}%` }}
                          />
                        )}
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{contrib.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Senior DS Prescriptive Recommendation */}
          <div className="bg-slate-50 dark:bg-[#161b22] border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm flex items-start gap-3">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-950/60 rounded-lg text-indigo-600 dark:text-indigo-400 shrink-0">
              <Lightbulb size={18} />
            </div>
            <div className="space-y-1">
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Prescriptive Action Plan
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {result.recommendation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
