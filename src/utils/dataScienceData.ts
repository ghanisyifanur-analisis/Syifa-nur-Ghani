/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Senior Data Science Data Models & Statistical Computation Engines
 */

export interface ModelMetric {
  id: string;
  name: string;
  family: 'Gradient Boosting' | 'Deep Learning' | 'Tree Ensemble' | 'Linear';
  status: 'Production' | 'Challenger' | 'Candidate' | 'Baseline';
  rocAuc: number;
  prAuc: number;
  f1Score: number;
  precision: number;
  recall: number;
  logLoss: number;
  latencyP95Ms: number;
  peakRamMb: number;
  parameters: string;
  psiDrift: number; // Population Stability Index
  description: string;
}

export const ML_MODELS: ModelMetric[] = [
  {
    id: 'lgbm-prod-v3',
    name: 'LightGBM Churn Optuna-Tuned',
    family: 'Gradient Boosting',
    status: 'Production',
    rocAuc: 0.942,
    prAuc: 0.898,
    f1Score: 0.884,
    precision: 0.892,
    recall: 0.876,
    logLoss: 0.218,
    latencyP95Ms: 11.4,
    peakRamMb: 142,
    parameters: 'max_depth=7, num_leaves=63, lr=0.03, colsample_bytree=0.82',
    psiDrift: 0.048,
    description: 'Current champion serving real-time scoring via Triton Inference Server with sub-15ms p95 latency.',
  },
  {
    id: 'xgb-challenger-v4',
    name: 'XGBoost Histogram Quantized',
    family: 'Gradient Boosting',
    status: 'Challenger',
    rocAuc: 0.946,
    prAuc: 0.904,
    f1Score: 0.889,
    precision: 0.897,
    recall: 0.881,
    logLoss: 0.209,
    latencyP95Ms: 16.8,
    peakRamMb: 210,
    parameters: 'tree_method=hist, max_depth=8, eta=0.025, subsample=0.85',
    psiDrift: 0.052,
    description: 'Higher ROC-AUC (+0.004) under shadow A/B evaluation against 15% live production traffic.',
  },
  {
    id: 'catboost-candidate',
    name: 'CatBoost Categorical Native',
    family: 'Gradient Boosting',
    status: 'Candidate',
    rocAuc: 0.939,
    prAuc: 0.891,
    f1Score: 0.878,
    precision: 0.885,
    recall: 0.871,
    logLoss: 0.224,
    latencyP95Ms: 22.3,
    peakRamMb: 320,
    parameters: 'iterations=1200, depth=6, l2_leaf_reg=4.5, one_hot_max_size=20',
    psiDrift: 0.041,
    description: 'Robust handling of categorical cardinalities without explicit one-hot encoding overhead.',
  },
  {
    id: 'deep-mlp-candidate',
    name: 'Residual Tabular MLP (PyTorch)',
    family: 'Deep Learning',
    status: 'Candidate',
    rocAuc: 0.928,
    prAuc: 0.874,
    f1Score: 0.865,
    precision: 0.871,
    recall: 0.859,
    logLoss: 0.245,
    latencyP95Ms: 34.6,
    peakRamMb: 480,
    parameters: 'layers=[256, 128, 64], dropout=0.25, batch_norm=True, AdamW',
    psiDrift: 0.082,
    description: 'Learned entity embeddings for high-dimensional customer activity telemetry.',
  },
  {
    id: 'random-forest-v1',
    name: 'Balanced Random Forest',
    family: 'Tree Ensemble',
    status: 'Candidate',
    rocAuc: 0.912,
    prAuc: 0.856,
    f1Score: 0.849,
    precision: 0.854,
    recall: 0.844,
    logLoss: 0.279,
    latencyP95Ms: 28.1,
    peakRamMb: 390,
    parameters: 'n_estimators=300, min_samples_split=8, max_features=sqrt',
    psiDrift: 0.065,
    description: 'Ensemble bagging baseline utilized for feature importance cross-validation.',
  },
  {
    id: 'logistic-reg-baseline',
    name: 'ElasticNet Logistic Regression',
    family: 'Linear',
    status: 'Baseline',
    rocAuc: 0.835,
    prAuc: 0.742,
    f1Score: 0.768,
    precision: 0.782,
    recall: 0.755,
    logLoss: 0.384,
    latencyP95Ms: 1.8,
    peakRamMb: 45,
    parameters: 'C=0.15, l1_ratio=0.5, solver=saga, max_iter=500',
    psiDrift: 0.022,
    description: 'Fast linear baseline for explainability checks and minimum variance comparisons.',
  },
];

export interface DatasetSummary {
  id: string;
  name: string;
  domain: string;
  rows: number;
  columns: number;
  missingCellsPercent: number;
  memorySizeMb: number;
  targetVariable: string;
  targetImbalance: string;
  features: FeatureStat[];
  correlations: { featA: string; featB: string; value: number }[];
}

export interface FeatureStat {
  name: string;
  type: 'numeric' | 'categorical';
  mean?: number;
  std?: number;
  median?: number;
  min?: number;
  max?: number;
  skewness?: number;
  missingRate: number;
  outlierCount: number;
  topCategories?: { label: string; count: number; pct: number }[];
  distributionBins?: { bin: string; count: number }[];
}

export const DATASETS: DatasetSummary[] = [
  {
    id: 'telecom-churn',
    name: 'Enterprise Telemetry & Churn Dynamics',
    domain: 'Subscription & SaaS',
    rows: 12450,
    columns: 22,
    missingCellsPercent: 0.42,
    memorySizeMb: 18.6,
    targetVariable: 'churned_30d',
    targetImbalance: '84.2% Retained vs 15.8% Churned',
    features: [
      {
        name: 'monthly_contract_value',
        type: 'numeric',
        mean: 78.45,
        std: 28.32,
        median: 74.2,
        min: 19.9,
        max: 189.5,
        skewness: 0.64,
        missingRate: 0.0,
        outlierCount: 142,
        distributionBins: [
          { bin: '$20-$50', count: 2850 },
          { bin: '$50-$80', count: 4820 },
          { bin: '$80-$110', count: 3210 },
          { bin: '$110-$140', count: 1240 },
          { bin: '$140+', count: 330 },
        ],
      },
      {
        name: 'tenure_months',
        type: 'numeric',
        mean: 32.8,
        std: 22.4,
        median: 29.0,
        min: 1,
        max: 72,
        skewness: 0.28,
        missingRate: 0.0,
        outlierCount: 0,
        distributionBins: [
          { bin: '0-12m', count: 3750 },
          { bin: '13-24m', count: 2640 },
          { bin: '25-48m', count: 3410 },
          { bin: '49-72m', count: 2650 },
        ],
      },
      {
        name: 'support_tickets_90d',
        type: 'numeric',
        mean: 2.14,
        std: 1.85,
        median: 2.0,
        min: 0,
        max: 14,
        skewness: 1.45,
        missingRate: 0.12,
        outlierCount: 284,
        distributionBins: [
          { bin: '0 tickets', count: 3950 },
          { bin: '1-2 tickets', count: 5210 },
          { bin: '3-4 tickets', count: 2310 },
          { bin: '5+ tickets', count: 980 },
        ],
      },
      {
        name: 'network_packet_loss_pct',
        type: 'numeric',
        mean: 0.85,
        std: 0.72,
        median: 0.6,
        min: 0.0,
        max: 5.4,
        skewness: 2.15,
        missingRate: 0.05,
        outlierCount: 198,
        distributionBins: [
          { bin: '<0.5%', count: 5800 },
          { bin: '0.5-1.5%', count: 4720 },
          { bin: '1.5-3.0%', count: 1510 },
          { bin: '>3.0%', count: 420 },
        ],
      },
      {
        name: 'contract_type',
        type: 'categorical',
        missingRate: 0.0,
        outlierCount: 0,
        topCategories: [
          { label: 'Month-to-Month', count: 6850, pct: 55.0 },
          { label: 'One Year', count: 3120, pct: 25.1 },
          { label: 'Two Year Enterprise', count: 2480, pct: 19.9 },
        ],
      },
      {
        name: 'payment_method',
        type: 'categorical',
        missingRate: 0.0,
        outlierCount: 0,
        topCategories: [
          { label: 'Bank Direct Debit', count: 4980, pct: 40.0 },
          { label: 'Credit Card Auto', count: 4120, pct: 33.1 },
          { label: 'Manual Wire Transfer', count: 3350, pct: 26.9 },
        ],
      },
    ],
    correlations: [
      { featA: 'monthly_contract_value', featB: 'tenure_months', value: 0.38 },
      { featA: 'monthly_contract_value', featB: 'support_tickets_90d', value: 0.24 },
      { featA: 'support_tickets_90d', featB: 'network_packet_loss_pct', value: 0.58 },
      { featA: 'tenure_months', featB: 'support_tickets_90d', value: -0.31 },
      { featA: 'monthly_contract_value', featB: 'network_packet_loss_pct', value: 0.12 },
      { featA: 'tenure_months', featB: 'network_packet_loss_pct', value: -0.19 },
    ],
  },
  {
    id: 'fintech-fraud',
    name: 'High-Throughput Card Payment Fraud',
    domain: 'Fintech & Risk Engineering',
    rows: 48600,
    columns: 28,
    missingCellsPercent: 0.08,
    memorySizeMb: 64.2,
    targetVariable: 'is_fraudulent',
    targetImbalance: '99.12% Legitimate vs 0.88% Fraud',
    features: [
      {
        name: 'transaction_amount_usd',
        type: 'numeric',
        mean: 142.1,
        std: 315.6,
        median: 48.5,
        min: 1.0,
        max: 9800.0,
        skewness: 4.82,
        missingRate: 0.0,
        outlierCount: 1140,
        distributionBins: [
          { bin: '$0-$50', count: 24500 },
          { bin: '$50-$200', count: 16200 },
          { bin: '$200-$1000', count: 6400 },
          { bin: '$1000+', count: 1500 },
        ],
      },
      {
        name: 'device_velocity_score',
        type: 'numeric',
        mean: 1.84,
        std: 2.12,
        median: 1.0,
        min: 0,
        max: 18,
        skewness: 2.94,
        missingRate: 0.01,
        outlierCount: 680,
        distributionBins: [
          { bin: '0-1 tx/hr', count: 32000 },
          { bin: '2-4 tx/hr', count: 12400 },
          { bin: '5-9 tx/hr', count: 3400 },
          { bin: '10+ tx/hr', count: 800 },
        ],
      },
      {
        name: 'geo_distance_from_home_km',
        type: 'numeric',
        mean: 28.4,
        std: 142.8,
        median: 4.2,
        min: 0.1,
        max: 8400.0,
        skewness: 6.18,
        missingRate: 0.02,
        outlierCount: 920,
        distributionBins: [
          { bin: '<10 km', count: 34100 },
          { bin: '10-50 km', count: 9800 },
          { bin: '50-500 km', count: 3200 },
          { bin: '>500 km', count: 1500 },
        ],
      },
    ],
    correlations: [
      { featA: 'transaction_amount_usd', featB: 'device_velocity_score', value: 0.44 },
      { featA: 'device_velocity_score', featB: 'geo_distance_from_home_km', value: 0.36 },
      { featA: 'transaction_amount_usd', featB: 'geo_distance_from_home_km', value: 0.28 },
    ],
  },
];

/**
 * Interactive What-If XAI Simulation
 */
export interface WhatIfInput {
  monthlyCharges: number;
  tenureMonths: number;
  contractType: 'month-to-month' | 'one-year' | 'two-year';
  supportTickets: number;
  packetLossPct: number;
  hasAutoPay: boolean;
}

export interface WhatIfResult {
  churnProbability: number;
  riskTier: 'Low' | 'Moderate' | 'High' | 'Critical';
  baseProbability: number;
  shapContributions: {
    feature: string;
    value: number; // positive increases churn, negative decreases
    description: string;
  }[];
  recommendation: string;
}

export function computeWhatIfInference(input: WhatIfInput): WhatIfResult {
  const baseProb = 0.18; // Base population rate

  // Realistic feature attributions based on logistic regression log-odds weights
  let logOdds = Math.log(baseProb / (1 - baseProb));

  // 1. Contract Type Impact
  let contractShap = 0;
  if (input.contractType === 'month-to-month') {
    contractShap = 0.65;
  } else if (input.contractType === 'one-year') {
    contractShap = -0.32;
  } else {
    contractShap = -0.78;
  }
  logOdds += contractShap;

  // 2. Tenure Impact (longer tenure lowers churn)
  const tenureNormalized = (input.tenureMonths - 30) / 20;
  const tenureShap = -0.42 * tenureNormalized;
  logOdds += tenureShap;

  // 3. Support Tickets Impact (high tickets indicate frustration)
  const ticketsNormalized = (input.supportTickets - 2) / 1.5;
  const ticketShap = 0.38 * ticketsNormalized;
  logOdds += ticketShap;

  // 4. Monthly Charges (high spend has higher churn sensitivity)
  const chargesNormalized = (input.monthlyCharges - 75) / 30;
  const chargeShap = 0.22 * chargesNormalized;
  logOdds += chargeShap;

  // 5. Packet Loss (network QoS degradation)
  const packetShap = 0.35 * (input.packetLossPct - 0.8);
  logOdds += packetShap;

  // 6. Payment Method AutoPay
  const autopayShap = input.hasAutoPay ? -0.24 : 0.18;
  logOdds += autopayShap;

  // Sigmoid transfer
  const prob = 1 / (1 + Math.exp(-logOdds));
  const finalProb = Math.min(0.98, Math.max(0.02, prob));

  let riskTier: WhatIfResult['riskTier'] = 'Low';
  if (finalProb > 0.65) riskTier = 'Critical';
  else if (finalProb > 0.4) riskTier = 'High';
  else if (finalProb > 0.2) riskTier = 'Moderate';

  const shapContributions = [
    {
      feature: `Contract: ${input.contractType}`,
      value: Number((contractShap * 0.15).toFixed(3)),
      description:
        input.contractType === 'month-to-month'
          ? 'Lack of long-term contract increases churn vulnerability'
          : 'Multi-year commitment provides high retention stability',
    },
    {
      feature: `Support Tickets: ${input.supportTickets}`,
      value: Number((ticketShap * 0.15).toFixed(3)),
      description:
        input.supportTickets > 3
          ? 'High ticket frequency indicates unresolved technical distress'
          : 'Low ticket volume indicates smooth user experience',
    },
    {
      feature: `Tenure: ${input.tenureMonths} mo`,
      value: Number((tenureShap * 0.15).toFixed(3)),
      description:
        input.tenureMonths < 12
          ? 'First-year accounts have heightened onboarding churn risk'
          : 'Mature tenure builds brand stickiness and product integration',
    },
    {
      feature: `Monthly Spend: $${input.monthlyCharges}`,
      value: Number((chargeShap * 0.15).toFixed(3)),
      description:
        input.monthlyCharges > 100
          ? 'Premium tier customers expect higher white-glove SLA support'
          : 'Cost-effective tier with stable price sensitivity',
    },
    {
      feature: `Network Loss: ${input.packetLossPct.toFixed(1)}%`,
      value: Number((packetShap * 0.15).toFixed(3)),
      description:
        input.packetLossPct > 2.0
          ? 'Degraded QoS directly causes negative customer sentiment'
          : 'Healthy network telemetry under standard baseline',
    },
    {
      feature: `AutoPay: ${input.hasAutoPay ? 'Active' : 'Disabled'}`,
      value: Number((autopayShap * 0.15).toFixed(3)),
      description: input.hasAutoPay ? 'Frictionless automated payment lowers involuntary churn' : 'Manual billing friction introduces payment failure churn',
    },
  ];

  let recommendation = '';
  if (riskTier === 'Critical') {
    recommendation =
      'Immediate CSM intervention recommended. Trigger high-priority VIP ticket resolution, propose 1-year contract lock with 15% discount, and schedule network SLA diagnosis.';
  } else if (riskTier === 'High') {
    recommendation =
      'Proactive automated retention flow. Dispatch satisfaction survey, provide dedicated onboarding specialist follow-up, and recommend switching to automated billing.';
  } else if (riskTier === 'Moderate') {
    recommendation =
      'Standard customer health monitoring. Encourage feature adoption webinars and offer annual billing incentive.';
  } else {
    recommendation =
      'Account is healthy and engaged. Prime candidate for expansion upsell (Enterprise add-on or multi-seat licensing).';
  }

  return {
    churnProbability: Number(finalProb.toFixed(3)),
    riskTier,
    baseProbability: baseProb,
    shapContributions,
    recommendation,
  };
}

/**
 * A/B Testing & Statistical Experimentation Engine
 */

export interface AbTestInput {
  controlVisitors: number;
  controlConversions: number;
  variantVisitors: number;
  variantConversions: number;
  confidenceLevel: 0.9 | 0.95 | 0.99;
}

export interface AbTestResult {
  controlRate: number;
  variantRate: number;
  relativeLift: number;
  absoluteDifference: number;
  pooledProbability: number;
  standardError: number;
  zScore: number;
  pValue: number;
  isSignificant: boolean;
  ciLower: number;
  ciUpper: number;
  verdict: string;
}

// Approximation of normal cumulative distribution function (error function based)
export function normalCdf(z: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp((-z * z) / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return z > 0 ? 1 - p : p;
}

export function computeAbTestResults(input: AbTestInput): AbTestResult {
  const { controlVisitors, controlConversions, variantVisitors, variantConversions, confidenceLevel } = input;

  const controlRate = controlConversions / controlVisitors;
  const variantRate = variantConversions / variantVisitors;
  const absoluteDifference = variantRate - controlRate;
  const relativeLift = Number(((absoluteDifference / controlRate) * 100).toFixed(4));

  const pooledProbability = (controlConversions + variantConversions) / (controlVisitors + variantVisitors);
  const standardError = Math.sqrt(
    pooledProbability * (1 - pooledProbability) * (1 / controlVisitors + 1 / variantVisitors)
  );

  const zScore = standardError > 0 ? absoluteDifference / standardError : 0;
  const pValue = 2 * (1 - normalCdf(Math.abs(zScore)));

  // Critical z for confidence levels
  const zCritMap: Record<number, number> = {
    0.9: 1.645,
    0.95: 1.96,
    0.99: 2.576,
  };
  const zCrit = zCritMap[confidenceLevel] || 1.96;
  const alpha = 1 - confidenceLevel;
  const isSignificant = pValue < alpha;

  // Unpooled SE for confidence interval
  const seDiff = Math.sqrt(
    (controlRate * (1 - controlRate)) / controlVisitors + (variantRate * (1 - variantRate)) / variantVisitors
  );
  const ciLower = absoluteDifference - zCrit * seDiff;
  const ciUpper = absoluteDifference + zCrit * seDiff;

  let verdict = '';
  if (isSignificant && relativeLift > 0) {
    verdict = `Statistically Significant Winner: Variant achieves a +${relativeLift.toFixed(
      2
    )}% lift with p-value = ${pValue.toFixed(4)} (< ${(alpha).toFixed(2)}). Reject H0 with ${(
      confidenceLevel * 100
    ).toFixed(0)}% confidence. Safe to deploy to 100% traffic.`;
  } else if (isSignificant && relativeLift < 0) {
    verdict = `Statistically Significant Degradation: Variant underperformed control by ${relativeLift.toFixed(
      2
    )}% (p-value = ${pValue.toFixed(4)}). Immediately halt experiment to prevent business revenue loss.`;
  } else {
    verdict = `Inconclusive / No Significant Difference: p-value = ${pValue.toFixed(
      4
    )} exceeds alpha (${alpha.toFixed(2)}). Insufficient evidence to reject the null hypothesis. Consider extending sample duration or applying CUPED variance reduction.`;
  }

  return {
    controlRate,
    variantRate,
    relativeLift,
    absoluteDifference,
    pooledProbability,
    standardError,
    zScore,
    pValue,
    isSignificant,
    ciLower,
    ciUpper,
    verdict,
  };
}

/**
 * Sample Size Estimator for Statistical Power (80% Power, 95% Confidence)
 */
export function estimateRequiredSampleSize(
  baselineRate: number,
  mdePercent: number, // Minimum Detectable Effect (e.g. 5 = 5% relative lift)
  confidence: number = 0.95,
  power: number = 0.8
): { sampleSizePerVariant: number; totalSampleSize: number } {
  const zAlpha = confidence === 0.99 ? 2.576 : confidence === 0.9 ? 1.645 : 1.96;
  const zBeta = power === 0.9 ? 1.282 : 0.842; // 80% power = 0.842

  const p1 = baselineRate;
  const p2 = baselineRate * (1 + mdePercent / 100);
  const delta = Math.abs(p2 - p1);

  if (delta === 0) return { sampleSizePerVariant: 0, totalSampleSize: 0 };

  const pBar = (p1 + p2) / 2;
  const numerator =
    (zAlpha * Math.sqrt(2 * pBar * (1 - pBar)) + zBeta * Math.sqrt(p1 * (1 - p1) + p2 * (1 - p2))) ** 2;
  const n = Math.ceil(numerator / (delta * delta));

  return {
    sampleSizePerVariant: n,
    totalSampleSize: n * 2,
  };
}

/**
 * Population Stability Index (PSI) Drift Calculation
 */
export interface PsiBucket {
  bucket: string;
  baselinePct: number;
  currentPct: number;
  psiContribution: number;
}

export function computePsi(baselinePcts: number[], currentPcts: number[]): { totalPsi: number; status: 'Stable' | 'Moderate Drift' | 'Significant Drift' } {
  let totalPsi = 0;
  for (let i = 0; i < baselinePcts.length; i++) {
    const b = Math.max(0.0001, baselinePcts[i] / 100);
    const c = Math.max(0.0001, currentPcts[i] / 100);
    const contribution = (c - b) * Math.log(c / b);
    totalPsi += contribution;
  }

  let status: 'Stable' | 'Moderate Drift' | 'Significant Drift' = 'Stable';
  if (totalPsi >= 0.25) status = 'Significant Drift';
  else if (totalPsi >= 0.1) status = 'Moderate Drift';

  return { totalPsi: Number(totalPsi.toFixed(4)), status };
}

/**
 * Senior Data Science Production Code Vault
 */
export interface CodeRecipe {
  id: string;
  title: string;
  category: 'PySpark & Distributed' | 'Polars & High-Perf' | 'PyTorch & Deep Learning' | 'Advanced SQL' | 'Hyperopt & MLOps';
  description: string;
  language: string;
  code: string;
}

export const CODE_RECIPES: CodeRecipe[] = [
  {
    id: 'pyspark-rolling-window',
    title: 'PySpark Distributed 30-Day Rolling Aggregations',
    category: 'PySpark & Distributed',
    language: 'python',
    description: 'High-throughput feature engineering over streaming telemetry partitions without data skews or memory blowouts.',
    code: `from pyspark.sql import functions as F
from pyspark.sql.window import Window

# Partition by customer and order by event timestamp in seconds
days_30_secs = 30 * 86400
rolling_spec = (
    Window.partitionBy("customer_id")
    .orderBy(F.col("event_timestamp").cast("long"))
    .rangeBetween(-days_30_secs, 0)
)

features_df = df.withColumns({
    "rolling_tx_count_30d": F.count("transaction_id").over(rolling_spec),
    "rolling_spend_sum_30d": F.sum("amount_usd").over(rolling_spec),
    "rolling_spend_std_30d": F.stddev("amount_usd").over(rolling_spec),
    "max_velocity_delta_30d": (
        F.col("amount_usd") / (F.avg("amount_usd").over(rolling_spec) + 1e-5)
    )
}).na.fill(0.0)`,
  },
  {
    id: 'polars-lazy-joins',
    title: 'Polars LazyFrame Memory-Mapped Out-of-Core Processing',
    category: 'Polars & High-Perf',
    language: 'python',
    description: '10x-50x faster than Pandas on single-node servers, leveraging Rust multi-threading and SIMD vectorization.',
    code: `import polars as pl

# Execute query lazily with streaming mode enabled for datasets larger than RAM
result = (
    pl.scan_parquet("s3://data-lake/transactions/*.parquet")
    .filter(pl.col("timestamp") >= pl.datetime(2026, 1, 1))
    .join(
        pl.scan_parquet("s3://data-lake/merchants.parquet"),
        on="merchant_id",
        how="inner"
    )
    .group_by(["merchant_category", pl.col("timestamp").dt.month().alias("month")])
    .agg([
        pl.len().alias("total_tx"),
        pl.col("amount").quantile(0.95).alias("p95_amount"),
        pl.col("is_fraud").mean().alias("fraud_rate"),
        pl.col("amount").filter(pl.col("is_fraud") == 1).sum().alias("fraud_volume_usd")
    ])
    .sort("fraud_volume_usd", descending=True)
    .collect(streaming=True)
)`,
  },
  {
    id: 'pytorch-focal-loss',
    title: 'PyTorch Focal Loss for Extreme Class Imbalance',
    category: 'PyTorch & Deep Learning',
    language: 'python',
    description: 'Addresses severe label skew (e.g. 0.5% fraud/churn) by down-weighting easy negative examples dynamically.',
    code: `import torch
import torch.nn as nn
import torch.nn.functional as F

class BinaryFocalLoss(nn.Module):
    """
    FL(p_t) = -alpha_t * (1 - p_t)^gamma * log(p_t)
    Focal parameter gamma concentrates gradient updates on hard misclassifications.
    """
    def __init__(self, alpha: float = 0.75, gamma: float = 2.0, reduction: str = 'mean'):
        super().__init__()
        self.alpha = alpha
        self.gamma = gamma
        self.reduction = reduction

    def forward(self, logits: torch.Tensor, targets: torch.Tensor) -> torch.Tensor:
        bce_loss = F.binary_cross_entropy_with_logits(logits, targets, reduction='none')
        probs = torch.sigmoid(logits)
        p_t = targets * probs + (1 - targets) * (1 - probs)
        alpha_factor = targets * self.alpha + (1 - targets) * (1 - self.alpha)
        modulating_factor = (1.0 - p_t) ** self.gamma
        loss = alpha_factor * modulating_factor * bce_loss

        if self.reduction == 'mean':
            return loss.mean()
        elif self.reduction == 'sum':
            return loss.sum()
        return loss`,
  },
  {
    id: 'advanced-sql-cohort',
    title: 'SQL Monthly Retention Matrix & Cohort LTV Decay',
    category: 'Advanced SQL',
    language: 'sql',
    description: 'Production DuckDB/Snowflake/BigQuery SQL query producing triangular retention matrices for executive review.',
    code: `WITH user_first_touch AS (
    SELECT
        user_id,
        DATE_TRUNC('month', MIN(signup_timestamp)) AS cohort_month
    FROM enterprise_events
    GROUP BY 1
),
monthly_activities AS (
    SELECT
        e.user_id,
        DATE_TRUNC('month', e.event_timestamp) AS activity_month,
        SUM(e.net_revenue_usd) AS revenue_generated
    FROM enterprise_events e
    GROUP BY 1, 2
)
SELECT
    f.cohort_month,
    DATEDIFF('month', f.cohort_month, a.activity_month) AS period_month,
    COUNT(DISTINCT f.user_id) AS cohort_size,
    COUNT(DISTINCT a.user_id) AS retained_users,
    ROUND(COUNT(DISTINCT a.user_id) * 100.0 / COUNT(DISTINCT f.user_id), 2) AS retention_rate_pct,
    ROUND(SUM(a.revenue_generated), 2) AS cohort_net_revenue
FROM user_first_touch f
LEFT JOIN monthly_activities a
    ON f.user_id = a.user_id
    AND a.activity_month >= f.cohort_month
GROUP BY 1, 2
ORDER BY 1, 2;`,
  },
  {
    id: 'optuna-hyperband',
    title: 'Optuna Bayesian Hyperparameter Search with Hyperband Pruning',
    category: 'Hyperopt & MLOps',
    language: 'python',
    description: 'Automated hyperparameter optimization maximizing PR-AUC with early stopping on unpromising trials.',
    code: `import optuna
import lightgbm as lgb
from sklearn.metrics import average_precision_score

def objective(trial: optuna.Trial) -> float:
    params = {
        "objective": "binary",
        "metric": "binary_logloss",
        "boosting_type": "gbdt",
        "n_estimators": 1000,
        "learning_rate": trial.suggest_float("lr", 0.01, 0.15, log=True),
        "num_leaves": trial.suggest_int("num_leaves", 15, 255),
        "max_depth": trial.suggest_int("max_depth", 4, 12),
        "subsample": trial.suggest_float("subsample", 0.6, 0.95),
        "colsample_bytree": trial.suggest_float("colsample_bytree", 0.6, 0.95),
        "reg_alpha": trial.suggest_float("reg_alpha", 1e-3, 10.0, log=True),
        "reg_lambda": trial.suggest_float("reg_lambda", 1e-3, 10.0, log=True),
    }

    # LightGBM integration with Optuna pruning callback
    pruning_cb = optuna.integration.LightGBMPruningCallback(trial, "binary_logloss")
    model = lgb.LGBMClassifier(**params)
    model.fit(
        X_train, y_train,
        eval_set=[(X_val, y_val)],
        callbacks=[pruning_cb, lgb.early_stopping(50, verbose=False)]
    )

    val_preds = model.predict_proba(X_val)[:, 1]
    return average_precision_score(y_val, val_preds)

study = optuna.create_study(
    direction="maximize",
    pruner=optuna.pruners.HyperbandPruner()
)
study.optimize(objective, n_trials=100, timeout=1800)`,
  },
];
