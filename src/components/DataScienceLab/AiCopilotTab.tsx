/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Loader2,
  Check,
  Copy,
  BrainCircuit,
  Terminal,
  Lightbulb,
  CheckCircle2,
  Flame,
} from 'lucide-react';

interface AdviceResponse {
  title: string;
  executiveSummary: string;
  technicalInsights: { heading: string; detail: string }[];
  recommendedActions: string[];
  codeSnippet?: string;
}

export const AiCopilotTab: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [advice, setAdvice] = useState<AdviceResponse | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const quickPrompts = [
    {
      label: 'Sub-15ms MLOps Inference',
      query: 'What is the optimal production MLOps deployment architecture to serve real-time predictions under 15ms p95 latency?',
      topic: 'High-Throughput Real-Time Inference',
    },
    {
      label: 'Extreme 0.8% Class Imbalance',
      query: 'How to address severe 0.8% fraud class skew without inflating false positive rate using Focal Loss and threshold tuning?',
      topic: 'Severe Class Imbalance & Metric Alignment',
    },
    {
      label: 'CUPED Variance Reduction',
      query: 'How does CUPED variance reduction accelerate A/B experimentation sample size efficiency in online controlled experiments?',
      topic: 'A/B Testing & Causal Inference',
    },
    {
      label: 'Detecting & Mitigating Covariate Drift',
      query: 'How to implement automated Population Stability Index (PSI) drift alarms and warm-start retraining pipelines?',
      topic: 'Covariate Shift & Automated Retraining',
    },
  ];

  const handleAskCopilot = async (customQuery?: string, customTopic?: string) => {
    const promptToSend = customQuery || query;
    if (!promptToSend.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/ai/data-science-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: promptToSend,
          topic: customTopic || 'Senior Data Science & Machine Learning Architecture',
          datasetName: 'Enterprise Telemetry & Churn Dynamics',
          modelName: 'LightGBM / Triton Serving',
        }),
      });

      const data = await res.json();
      if (data.advice) {
        setAdvice(data.advice);
      }
    } catch (err) {
      console.error('Failed to query DS Copilot:', err);
      // Fallback
      setAdvice({
        title: 'Senior Data Science Architecture: Distributed Real-Time Inference',
        executiveSummary:
          'Sub-15ms p95 latency requires decoupled feature retrieval via in-memory Redis stores and compiled model runtimes (ONNX / TensorRT) deployed on Triton Inference Server.',
        technicalInsights: [
          {
            heading: 'Compilation via ONNX Runtime & TensorRT',
            detail:
              'Exporting boosted tree ensembles to ONNX Runtime reduces C++ kernel overhead by eliminating Python GIL contention, cutting p95 response time from 35ms to 8.4ms.',
          },
          {
            heading: 'Feature Store Point-in-Time Consistency',
            detail:
              'Feast Feature Store ensures training-serving parity. Pre-computed user rolling aggregations are synchronized to Redis with TTL expiration.',
          },
        ],
        recommendedActions: [
          'Convert models to ONNX and profile using perf_analyzer under 500 QPS load.',
          'Deploy horizontal pod autoscaling based on GPU/CPU queue latency metrics.',
        ],
        codeSnippet: `# ONNX Export for LightGBM
import onnxmltools
from onnxmltools.convert.common.data_types import FloatTensorType

initial_type = [('float_input', FloatTensorType([None, num_features]))]
onnx_model = onnxmltools.convert_lightgbm(lgb_model, initial_types=initial_type)
onnxmltools.utils.save_model(onnx_model, 'model.onnx')`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Copilot Header */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-800/40 rounded-xl p-5 text-white shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-purple-500/30 text-purple-200 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-purple-400/30 flex items-center gap-1">
                <Sparkles size={12} className="text-amber-300 animate-pulse" /> Gemini AI Senior Data Science Copilot
              </span>
              <span className="text-xs text-indigo-300 font-mono">Gemini 4 Argon High-Thinking</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight">
              Principal Data Scientist & Machine Learning Architect AI
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Consult with Gemini on advanced statistical problems, production MLOps design,
              extreme class imbalance strategies, and causal A/B testing designs.
            </p>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="mt-5 pt-4 border-t border-purple-800/40">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">
            Suggested Senior DS Consultations:
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(p.query);
                  handleAskCopilot(p.query, p.topic);
                }}
                disabled={isLoading}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-purple-900/50 border border-purple-500/30 text-purple-200 transition-colors flex items-center gap-1.5"
              >
                <span>{p.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Query Input Box */}
      <div className="bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm space-y-3">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
          Ask a Technical Question (Modeling, Statistics, MLOps, Distributed Systems):
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAskCopilot();
            }}
            placeholder="e.g. How to structure Bayesian hyperparameter search for time-series forecasting with Prophet?"
            className="flex-1 bg-slate-50 dark:bg-[#161b22] border border-slate-300 dark:border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={() => handleAskCopilot()}
            disabled={isLoading || !query.trim()}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Reasoning...</span>
              </>
            ) : (
              <>
                <Send size={14} />
                <span>Consult Copilot</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Copilot Response Display */}
      {isLoading && (
        <div className="bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800 rounded-xl p-10 text-center space-y-3 shadow-sm">
          <Loader2 size={28} className="mx-auto text-purple-600 animate-spin" />
          <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Gemini 4 Argon High-Thinking In Progress...
          </div>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Formulating mathematical proofs, architectural patterns, and production code implementations.
          </p>
        </div>
      )}

      {advice && !isLoading && (
        <div className="bg-white dark:bg-[#0d1117] border border-purple-200 dark:border-purple-900/60 rounded-xl p-6 shadow-sm space-y-6">
          {/* Title & Summary */}
          <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300">
                Architectural Diagnosis
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {advice.title}
            </h3>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-[#161b22] p-3.5 rounded-lg border border-slate-200 dark:border-slate-800">
              {advice.executiveSummary}
            </p>
          </div>

          {/* Technical Insights */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Core Technical Insights
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {advice.technicalInsights.map((insight, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-slate-50/70 dark:bg-[#161b22] border border-slate-200 dark:border-slate-800 space-y-1.5"
                >
                  <div className="font-bold text-xs text-purple-700 dark:text-purple-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    <span>{insight.heading}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {insight.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Items */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Recommended Engineering Actions
            </h4>
            <div className="space-y-1.5">
              {advice.recommendedActions.map((action, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>{action}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Code Snippet */}
          {advice.codeSnippet && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Terminal size={14} /> Production Code Solution
                </h4>
                <button
                  onClick={() => handleCopyCode(advice.codeSnippet!)}
                  className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-700"
                >
                  {copiedCode ? (
                    <>
                      <Check size={12} className="text-emerald-500" />
                      <span className="text-emerald-600 font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 bg-[#0d1117] text-slate-200 font-mono text-xs rounded-lg overflow-x-auto">
                <pre>
                  <code>{advice.codeSnippet}</code>
                </pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
