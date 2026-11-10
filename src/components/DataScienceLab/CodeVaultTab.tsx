/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Code2,
  Copy,
  Check,
  Terminal,
  BookOpen,
  Sparkles,
  Layers,
  Flame,
} from 'lucide-react';
import { CODE_RECIPES, CodeRecipe } from '../../utils/dataScienceData';

export const CodeVaultTab: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    'All',
    'PySpark & Distributed',
    'Polars & High-Perf',
    'PyTorch & Deep Learning',
    'Advanced SQL',
    'Hyperopt & MLOps',
  ];

  const filteredRecipes =
    selectedCategory === 'All'
      ? CODE_RECIPES
      : CODE_RECIPES.filter((r) => r.category === selectedCategory);

  const handleCopy = async (id: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2200);
    } catch (e) {
      console.error('Copy failed', e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800 flex items-center gap-1">
                <Code2 size={12} /> Senior Engineering Vault
              </span>
              <span className="text-xs text-slate-500 font-mono">Production Recipes</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Production Data Science & Distributed Computing Recipes
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              Tested architectural implementations for distributed feature aggregation, extreme class imbalance,
              out-of-core Polars processing, and cohort SQL analytics.
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 flex-wrap mt-5 pt-4 border-t border-slate-200 dark:border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-slate-50 dark:bg-[#161b22] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Code Recipe Cards */}
      <div className="space-y-6">
        {filteredRecipes.map((recipe) => {
          const isCopied = copiedId === recipe.id;

          return (
            <div
              key={recipe.id}
              className="bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm"
            >
              {/* Header */}
              <div className="bg-slate-50 dark:bg-[#161b22] px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      {recipe.title}
                    </span>
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300">
                      {recipe.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl">
                    {recipe.description}
                  </p>
                </div>

                <button
                  onClick={() => handleCopy(recipe.id, recipe.code)}
                  className="flex items-center gap-1.5 bg-white dark:bg-[#21262d] hover:bg-slate-100 dark:hover:bg-[#30363d] text-slate-700 dark:text-slate-200 text-xs font-medium px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 transition-colors shadow-sm"
                >
                  {isCopied ? (
                    <>
                      <Check size={14} className="text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy Snippet</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code display */}
              <div className="p-4 bg-[#0d1117] text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed">
                <pre>
                  <code>{recipe.code}</code>
                </pre>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
