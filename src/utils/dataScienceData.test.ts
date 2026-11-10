/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ML_MODELS,
  DATASETS,
  computeWhatIfInference,
  computeAbTestResults,
  estimateRequiredSampleSize,
  computePsi,
  normalCdf,
} from './dataScienceData';

test('ML_MODELS contains production models with expected metrics', () => {
  assert.ok(ML_MODELS.length >= 5, 'Should have multiple benchmarked models');
  const prodModel = ML_MODELS.find((m) => m.status === 'Production');
  assert.ok(prodModel, 'Should have a production model');
  assert.ok(prodModel.rocAuc > 0.9, 'Production model should have strong ROC-AUC');
  assert.ok(prodModel.latencyP95Ms < 20, 'Production model p95 latency should be sub-20ms');
});

test('DATASETS includes telecom-churn and fintech-fraud datasets with stats', () => {
  assert.equal(DATASETS.length, 2);
  const churn = DATASETS.find((d) => d.id === 'telecom-churn');
  assert.ok(churn);
  assert.ok(churn.features.length >= 4);
  assert.ok(churn.correlations.length > 0);
});

test('computeWhatIfInference responds logically to feature changes', () => {
  // Low-risk profile: 2-year contract, long tenure, zero tickets, low packet loss, autopay
  const lowRisk = computeWhatIfInference({
    monthlyCharges: 45,
    tenureMonths: 60,
    contractType: 'two-year',
    supportTickets: 0,
    packetLossPct: 0.1,
    hasAutoPay: true,
  });

  // High-risk profile: Month-to-month, 2 months tenure, 8 tickets, high packet loss, no autopay
  const highRisk = computeWhatIfInference({
    monthlyCharges: 140,
    tenureMonths: 2,
    contractType: 'month-to-month',
    supportTickets: 8,
    packetLossPct: 4.5,
    hasAutoPay: false,
  });

  assert.ok(
    highRisk.churnProbability > lowRisk.churnProbability,
    'High risk profile must have higher churn probability than low risk'
  );
  assert.ok(highRisk.churnProbability > 0.5, 'High risk should exceed 50%');
  assert.ok(lowRisk.churnProbability < 0.25, 'Low risk should be under 25%');
  assert.equal(highRisk.riskTier, 'Critical');
  assert.ok(lowRisk.shapContributions.length > 0);
});

test('A/B test calculator computes correct Z-score, p-value, and confidence interval', () => {
  // Scenario: Significant winner
  // Control: 1000 visitors, 100 conversions (10%)
  // Variant: 1000 visitors, 150 conversions (15%) -> +50% lift
  const res = computeAbTestResults({
    controlVisitors: 1000,
    controlConversions: 100,
    variantVisitors: 1000,
    variantConversions: 150,
    confidenceLevel: 0.95,
  });

  assert.equal(res.controlRate, 0.1);
  assert.equal(res.variantRate, 0.15);
  assert.ok(Math.abs(res.relativeLift - 50) < 0.01, 'Relative lift should be ~50%');
  assert.ok(res.zScore > 3.0, 'Z-score should be above 3 for 10% vs 15% on N=1000');
  assert.ok(res.pValue < 0.01, 'P-value should be highly significant (<0.01)');
  assert.equal(res.isSignificant, true);
  assert.ok(res.ciLower > 0, 'CI lower bound should be > 0');
});

test('normalCdf computes known normal distribution values', () => {
  assert.ok(Math.abs(normalCdf(0) - 0.5) < 0.001, 'CDF at 0 should be 0.5');
  assert.ok(Math.abs(normalCdf(1.96) - 0.975) < 0.005, 'CDF at 1.96 should be ~0.975');
  assert.ok(Math.abs(normalCdf(-1.96) - 0.025) < 0.005, 'CDF at -1.96 should be ~0.025');
});

test('estimateRequiredSampleSize returns reasonable sample sizes', () => {
  // Baseline 10%, 10% relative MDE (10% -> 11%)
  const size = estimateRequiredSampleSize(0.1, 10, 0.95, 0.8);
  assert.ok(size.sampleSizePerVariant > 1000, 'Sample size per variant should be > 1000');
  assert.equal(size.totalSampleSize, size.sampleSizePerVariant * 2);
});

test('computePsi accurately flags drift thresholds', () => {
  // Equal distributions: PSI should be ~0
  const stable = computePsi([20, 30, 25, 25], [20, 30, 25, 25]);
  assert.equal(stable.status, 'Stable');
  assert.ok(stable.totalPsi < 0.01);

  // Large shift
  const drifted = computePsi([40, 30, 20, 10], [10, 20, 30, 40]);
  assert.ok(drifted.totalPsi > 0.25);
  assert.equal(drifted.status, 'Significant Drift');
});
